import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, AbstractControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Product, Feature, listAllFeatures } from "../../models/Product";
import { CommonService } from 'src/app/common.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  // image: string;
  public image_set;

  private slideDOM;

  product: Product;
  possibleFeatures: Object;

  orderFeaturesForm: FormGroup;

  priceTotal: number;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private common: CommonService,
    private _fb: FormBuilder,
    private _orderService: OrderService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    // get the products from the server
    this.getProduct();

    // list of all possible feature
    this.possibleFeatures = listAllFeatures();
  }

  features(): FormArray {
    return this.orderFeaturesForm.get('features') as FormArray;
  }

  chainedInputs(featureInd: number) {
    return this.features().at(featureInd).get('chainedInputs') as FormArray;
  }

  // construct a form group for new featureType
  newFeature(feature: Feature): FormGroup {
    console.log("Creating ", feature.type, " for the form!!");

    let featureTemplate = {
      chainInpsHidden: ['true', Validators.required],
      type: [feature.type, Validators.required],
      title: [feature.title, Validators.required],
      name: [feature.name, Validators.required],
      price: [feature.price, Validators.required],
      input: ['', Validators.required],
      chainedInputs: this._fb.array([])
    };

    return this._fb.group(featureTemplate);
  }

  initializeFeaturesForm(): void {
    this.product.features.forEach((feature: any) => {
      let featureFormGroup: FormGroup = this.newFeature(feature);
      // featureFormGroup.valueChanges
      //   .subscribe((e) => {
      //     console.log('add chain called');
      //     // featureFormGroup.setValue(
      //     //   featureFormGroup.value,
      //     //   { emitEvent: false }
      //     // );
      //     if (featureFormGroup.value.chainInpsHidden === 'true') {
      //       featureFormGroup.setValue(
      //         {
      //           chainInpsHidden: 'false'
      //         }
      //       )
      //       this.addChainedInputs(e);
      //     }
      //   })
      this.features().push(featureFormGroup);
    });

    console.log('Order specs Object Created', this.orderFeaturesForm);
    console.log('feature at 0 ', this.features().at(0));
  }

  addChainedInputs(index: number): void {
    let feature: AbstractControl = this.features().at(index);

    setTimeout(() => {
      if (feature.value.chainInpsHidden && feature.valid) {
        console.log('Chained Inputs added', index);
        this.product.features[index].chainedInputs.forEach((input) => {
          this.chainedInputs(index).push(
            this.newFeature(input)
          );
        });

        // set the check for hidden chained inputs as false so that once added
        // inputs are not added again
        feature.patchValue({
          chainInpsHidden: false
        });

        console.log('Value after adding chains ', feature.value);
      }
    });
  }

  getProduct() {
    this.image_set = [];

    // get product details from the product service
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));

    this.common.setLoader(true);
    this._productService.getProduct(id).then((res) => {
      this.product = res["data"];
      this.insertForTesting();
      this.common.setLoader(false);
      console.log(this.product);
    })
      .then(() => {
        this.orderFeaturesForm = this._fb.group({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          stock: this.product.stock,
          sales: this.product.sales,
          image: this.product.image,
          features: this._fb.array([])
        });
        this.initializeFeaturesForm();
        this.updatePrice();
      });
  }

  slideLeft() { }

  slideRight() { }

  updatePrice() {
    console.log('intial price: ',this.priceTotal);
    this.priceTotal = this.orderFeaturesForm.value.price;
    console.log('base product price added: ', this.orderFeaturesForm.value.price);

    for (let i = 0; i < this.orderFeaturesForm.value.features.length; ++i) {
      this.priceTotal += this.orderFeaturesForm.value.features[i].price;
      console.log(this.orderFeaturesForm.value.features[i].price);

      for (let j = 0; j < this.orderFeaturesForm.value.features[i].chainedInputs.length; ++j) {
        this.priceTotal += this.orderFeaturesForm.value.features[i].chainedInputs[j].price;
        console.log(this.orderFeaturesForm.value.features[i].chainedInputs[j].price);
      }
    }
    console.log('Total Price: ', this.priceTotal);
  }

  onSubmit() {
    console.log('submit form');

    this.updatePrice();
    let order = this.orderFeaturesForm.value;
    order['totalPrice'] = this.priceTotal;
    console.log(order);
    this._orderService.addOrder(order);
    console.log(this._orderService.getOrder());
    this.router.navigate(['/order/summary']);
  }

  insertForTesting() {
    for (let i = 0; i < this.product.features.length; ++i) {
      this.product.features[i]['chainedInputs'] = [];
      this.product.features[i]['price'] = 999;
      this.product.features[i]['chainedInputs'].push({
        type: "color",
        trigger: 'red',
        name: "Colors",
        title: "Choose a color dynamically",
        price: 1000,
        inputs: [
          {
            type: "text",
            colorHex: "#1610f9",
            colorName: "Blue"
          },
          {
            type: "text",
            colorHex: "#000000",
            colorName: "Black"
          },
          {
            type: "text",
            colorHex: "#ff0000",
            colorName: "Red"
          }
        ]
      });

      this.product.features[i]['chainedInputs'].push(
        {
          name: 'Dropdown Selection',
          type: 'dropdown',
          title: 'Gender',
          price: 2000,
          inputs: [
            {
              type: 'text',
              choiceText: 'For Men',
              choiceValue: 'Men'
            },
            {
              type: 'text',
              choiceText: 'For Women',
              choiceValue: 'Women'
            }
          ]
        }
      );
    }
  }
}

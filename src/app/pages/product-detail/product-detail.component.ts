import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, AbstractControl, FormArray, FormGroup, Validators, Validator } from '@angular/forms';
import { Product, Feature, listAllFeatures } from "../../models/Product";
import { CommonService } from 'src/app/common.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public image_set;

  private slideDOM;

  product: Product;
  possibleFeatures: Object;

  orderFeaturesForm: FormGroup;
  formSubscription: Subscription;

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

  ngOnDestroy() {
    // unsubscribe to form value changes
    this.formSubscription.unsubscribe();
  }

  /**
   * get product from the server
   */
  getProduct(): void {
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
          price: this.product.basePrice,
          stock: this.product.stock,
          sales: this.product.sales,
          image: this.product.image,
          features: this._fb.array([])
        });
        this.initialiseFeaturesForm();
        this.onFormChanges();
      });
  }

  /**
   * helper for getting the formarray
   * @return {FormArray} FormArray of features
   */
  features(): FormArray {
    return this.orderFeaturesForm.get('features') as FormArray;
  }

  /**
   * heler returning form array of chained Inputs in a feature
   * @param {number} featureInd index of the feature which the chained input is part of
   * @return {FormArray} Form array of chained features
   */
  chainedInputs(featureInd: number): FormArray {
    return this.features().at(featureInd).get('chainedInputs') as FormArray;
  }

  // construct a form group for new featureType
  newFeature(feature: Feature, chained: boolean = false): FormGroup {
    let validators: Validators[] = [];

    if (!chained) {
      validators.push(
        Validators.required
      );
    }

    let featureTemplate = {
      chainInpsHidden: ['true'],
      type: [feature.type],
      title: [feature.title],
      name: [feature.name],
      price: [feature.price],
      input: [null, validators],
      chainedInputs: this._fb.array([])
    };

    return this._fb.group(featureTemplate);
  }

  /**
   * Initialise the customisation form after fetching the product
   */
  initialiseFeaturesForm(): void {
    this.product.features.forEach((feature: any) => {
      let featureFormGroup: FormGroup = this.newFeature(feature);
      this.features().push(featureFormGroup);
    });

    this.updateTotalPrice();

    console.log('Form Initialised')
  }

  addChainedInputs(index: number): void {
    console.log('Click event detected');
    let feature: AbstractControl = this.features().at(index);

    setTimeout(() => {
      if (feature.value.chainInpsHidden) {
        console.log('chains hidden');
      }

      if (feature.valid) {
        console.log('feature is valid');
      }

      if (feature.value.chainInpsHidden) {
        console.log('Chained Inputs added', index);
        this.product.features[index].chainedInputs.forEach((input) => {
          this.chainedInputs(index).push(
            this.newFeature(input, true)
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

  /**
   * update the total price of the order
   */
  updateTotalPrice(): void {
    // add the base price
    this.priceTotal = this.orderFeaturesForm.value.price;
    console.log(this.orderFeaturesForm.value.price);

    // loop through all features and add their prices
    for (let i = 0; i < this.orderFeaturesForm.value.features.length; ++i) {
      if (this.orderFeaturesForm.value.features[i].input) {
        this.priceTotal += this.orderFeaturesForm.value.features[i].price;
        console.log(this.orderFeaturesForm.value.features[i].price);
      }

      // loop through all the sub features of a feature and add their prices
      for (let j = 0; j < this.orderFeaturesForm.value.features[i].chainedInputs.length; ++j) {
        if (this.orderFeaturesForm.value.features[i].chainedInputs[j].input) {
          this.priceTotal += this.orderFeaturesForm.value.features[i].chainedInputs[j].price;
          console.log(this.orderFeaturesForm.value.features[i].chainedInputs[j].price);
        }
      }
    }
    console.log('Total Price: ', this.priceTotal);
  }

  /**
   * do the necessary when the customisation form updates
   */
  onFormChanges(): void {
    this.formSubscription = this.orderFeaturesForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.updateTotalPrice();
      });
  }

  /**
   * Removes the empty values from the form value object
   * @param  {any} order dirty order object containing empty values
   * @return {any} order clean order object with no empty values
   */
  cleanForm(order: any): any {
    for (let i = 0; i < order.features.length; ++i) {
      order.features[i].chainedInputs = order.features[i].chainedInputs.filter((chainedInput: any) => {
        if (chainedInput.input) {
          console.log('pass');
          return true;
        }
      });
    }

    return order;
  }

  /**
   * Submit the customisation form
   */
  onSubmit(): void {
    this.updateTotalPrice();
    let order = this.orderFeaturesForm.value;
    order = this.cleanForm(order);
    order['totalPrice'] = this.priceTotal;
    order.id = Math.floor(Math.random() * 100000);
    this._orderService.stageOrder(order);
    console.log('submit form');
    console.log(order);
    this.router.navigate(['/orders/723dhg/summary']);
  }

  insertForTesting(): void {
    this.product.features = [
      {
        name: 'Color',
        type: 'color',
        title: 'Choose A Color',
        price: 5,
        inputs: [
          {
            type: 'text',
            colorHex: '#1610f9',
            colorName: 'Blue'
          },
          {
            type: 'text',
            colorHex: '#00ff00',
            colorName: 'Green'
          },
          {
            type: 'text',
            colorHex: '#ff0000',
            colorName: 'Red'
          }
        ],
        chainedInputs: [
          {
            name: 'Dropdown Selection',
            type: 'dropdown',
            title: 'Select Cloth Pattern Style',
            price: 5,
            inputs: [
              {
                type: 'text',
                choiceText: 'Checks',
                choiceValue: 'checks'
              },
              {
                type: 'text',
                choiceText: 'Polka Dots',
                choiceValue: 'polkadots'
              },
              {
                type: 'text',
                choiceText: 'Flat Color',
                choiceValue: 'flat'
              },
              {
                type: 'text',
                choiceText: 'Flat Color',
                choiceValue: 'flat'
              }
            ]
          },
          {
            type: 'text',
            title: 'Enter any other remarks',
            name: 'remarks',
            price: 0,
            inputs: [],
            chainedInputs: []
          }
        ]
      },
      {
        name: 'Dropdown Selection',
        type: 'dropdown',
        title: 'Size',
        price: 0,
        inputs: [
          {
            type: 'text',
            choiceText: 'Large',
            choiceValue: 'L'
          },
          {
            type: 'text',
            choiceText: 'Medium',
            choiceValue: 'M'
          },
          {
            type: 'text',
            choiceText: 'Small',
            choiceValue: 'S'
          }

        ],
        chainedInputs: []
      },
      {
        name: 'Dropdown Selection',
        type: 'dropdown',
        title: 'Gender',
        price: 0,
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
        ],
        chainedInputs: []
      },
      {
        type: 'text',
        title: 'Enter mobile number of the recipient.',
        name: 'Mobile Number',
        price: 0,
        inputs: [],
        chainedInputs: [
          {
            name: 'Dropdown Selection',
            type: 'dropdown',
            title: 'Number Type',
            price: 0,
            inputs: [
              {
                type: 'text',
                choiceText: 'Home Phone',
                choiceValue: 'home'
              },
              {
                type: 'text',
                choiceText: 'Office Phone',
                choiceValue: 'office'
              }
            ]
          }
        ]
      }
    ];

    // for (let i = 0; i < this.product.features.length; ++i) {
    //   this.product.features[i]['chainedInputs'] = [];
    //   this.product.features[i]['chainedInputs'].push({
    //     type: "color",
    //     trigger: 'red',
    //     name: "Colors",
    //     title: "Choose a color dynamically",
    //     price: 1000,
    //     inputs: [
    //       {
    //         type: "text",
    //         colorHex: "#1610f9",
    //         colorName: "Blue"
    //       },
    //       {
    //         type: "text",
    //         colorHex: "#000000",
    //         colorName: "Black"
    //       },
    //       {
    //         type: "text",
    //         colorHex: "#ff0000",
    //         colorName: "Red"
    //       }
    //     ]
    //   });

    //   this.product.features[i]['chainedInputs'].push(
    //     {
    //       name: 'Dropdown Selection',
    //       type: 'dropdown',
    //       title: 'Gender',
    //       price: 2000,
    //       inputs: [
    //         {
    //           type: 'text',
    //           choiceText: 'For Men',
    //           choiceValue: 'Men'
    //         },
    //         {
    //           type: 'text',
    //           choiceText: 'For Women',
    //           choiceValue: 'Women'
    //         }
    //       ]
    //     }
    //   );

    //   this.product.features[i]['chainedInputs'].push({
    //     type: 'text',
    //     title: 'What is the quantity of order expected ?',
    //     name: 'Answer here in short text',
    //     price: 500,
    //     inputs: [],
    //     chainedInputs: []
    //   });
    // }
  }
}

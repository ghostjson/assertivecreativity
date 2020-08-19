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

  orderForm: FormGroup;
  formSubscription: Subscription;

  priceTotal: number;

  constructor(
    public _productService: ProductService,
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
    this.image_set = [
      {
        src: '/assets/images/alex-azabache-sonQndOBZyA-unsplash.jpg',
        title: 'Image 1 title',
        alt: 'Image alt for testing'
      },
      {
        src: '/assets/images/patrick-langwallner-CgrqCu5LVB8-unsplash.jpg',
        title: 'Image 2 title',
        alt: 'Image alt for testing'
      },
      {
        src: '/assets/images/silvana-carlos-ZtKIMl9oAxk-unsplash.jpg',
        title: 'Image 3 title',
        alt: 'Image alt for testing'
      }
    ];

    // get product details from the product service
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));

    this.common.setLoader(true);

    this.product = this._productService.getProduct(id);
    console.info('Product Received: ', this.product);

    this.orderForm = this._orderService.newOrderForm(this.product);
    console.log('Order Form: ', this.orderForm);
    
    this.initialiseForms();
    this.common.setLoader(false);
  }


  initialiseForms(): void {
    console.log('form initiliased');
  }

  customForms(): FormArray {
    console.info('custom forms: ', this.orderForm.get('customForms'));
    return this.orderForm.get('customForms') as FormArray;
  }

  options(index: number): FormArray {
    return this.customForms().at(index).get('options') as FormArray;
  }


  /**
   * update the total price of the order
   */
  updateTotalPrice(): void {
    // add the base price
    this.priceTotal = this.orderForm.value.price;
    console.log(this.orderForm.value.price);

    // loop through all features and add their prices
    for (let i = 0; i < this.orderForm.value.features.length; ++i) {
      if (this.orderForm.value.features[i].input) {
        this.priceTotal += this.orderForm.value.features[i].price;
        console.log(this.orderForm.value.features[i].price);
      }

      // loop through all the sub features of a feature and add their prices
      for (let j = 0; j < this.orderForm.value.features[i].chainedInputs.length; ++j) {
        if (this.orderForm.value.features[i].chainedInputs[j].input) {
          this.priceTotal += this.orderForm.value.features[i].chainedInputs[j].price;
          console.log(this.orderForm.value.features[i].chainedInputs[j].price);
        }
      }
    }
    console.log('Total Price: ', this.priceTotal);
  }

  /**
   * do the necessary when the customisation form updates
   */
  onFormChanges(): void {
    this.formSubscription = this.orderForm.valueChanges
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
    // this.updateTotalPrice();
    // let order = this.orderForm.value;
    // order = this.cleanForm(order);
    // order['totalPrice'] = this.priceTotal;
    // order.id = Math.floor(Math.random() * 100000);
    // this._orderService.stageOrder(order);
    // console.log('submit form');
    // console.log(order);
    // this.router.navigate(['/orders/723dhg/summary']);
    console.log('order confirm: ', this.orderForm.value)
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormGroup } from '@angular/forms';
import { Product, listAllFeatures } from "../../models/Product";
import { CommonService } from 'src/app/common.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/models/Order';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { CartItem } from 'src/app/models/Cart';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public image_set: any[];

  product: Product;
  possibleFeatures: Object;

  orderForm: FormGroup;
  formSubscription: Subscription;

  priceTotal: number;

  currentUrl: string;

  productId: number;

  constructor(
    public _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _common: CommonService,
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
  ) {
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.currentUrl =  this._router.url;
    
    // get the product from the server
    // and do the intialise everything
    this.initialise();

    // list of all possible feature
    this.possibleFeatures = listAllFeatures();
  }

  ngOnDestroy(): void {
    // unsubscribe to form value changes
    this.formSubscription.unsubscribe();
  }

  /**
   * get product from the server
   */
  initialise(): void {
    this.orderForm = null;
    this.product = null;
    
    // get product details from the product service
    
    this._common.setLoader(true);
    
    this._productService.getProduct(this.productId)
      .pipe(take(1))
      .subscribe(product => {
        this.product = product;
        /**
         * TODO: Fix for Array to string conversion bug
         */
        this.product.price_table = this.product.price_table;
        console.info('Product Received: ', this.product);
        
        this.image_set = [
          {
            src: this.product.image,
            title: 'Image 1 title',
            alt: 'Image alt for testing'
          }
        ];
        
        this.orderForm = this._orderService.newOrderForm(this.product);
        console.info('Order Form: ', this.orderForm);
        
        this.initialiseForms();
        this._common.setLoader(false);
      });  
  }

  /**
   * Initialisation steps for the order form
   */
  initialiseForms(): void {
    this.formSubscription = this.orderForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.updateTotalPrice();
      });
    console.log('form initiliased');
  }

  customForms(): FormArray {
    return this.orderForm.get('custom_forms') as FormArray;
  }

  options(index: number): FormArray {
    return this.customForms().at(index).get('options') as FormArray;
  }


  /**
   * update the total price of the order
   */
  updateTotalPrice(): void {
    /**
     * TODO: Implement updating prices
     */
    this.priceTotal = 0;
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

    let cartItem: CartItem = {
      product_id: this.productId,
      quantity: 1,
      custom_forms_entry: this.orderForm.value
    };

    // order = this.cleanForm(order);
    cartItem.total_price = this.priceTotal;
    this._cartService.addToCart(cartItem)
      .subscribe((item: CartItem) => {
        this._router.navigate(['/cart']);
        console.log('added to cart: ', item);
      });
  }
}

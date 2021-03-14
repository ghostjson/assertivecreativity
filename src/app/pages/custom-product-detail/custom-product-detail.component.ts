import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trackById } from 'src/app/library/TrackByFunctions';
import { CustomProduct, ProductAttribute } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-custom-product-detail',
  templateUrl: './custom-product-detail.component.html',
  styleUrls: ['./custom-product-detail.component.scss'],
})
export class CustomProductDetailComponent implements OnInit, OnDestroy {
  productId: number;
  product: CustomProduct;
  componentDestroy: Subject<void>;
  activeAttrs: FormGroup[];
  selectedAttrs: {
    config: ProductAttribute;
    form: FormGroup;
  }[];
  orderForm: FormGroup;
  trackById = trackById;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _orderService: OrderService
  ) {
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.params.id;
    console.log(this.productId, 'is the product id');

    // get the product data
    this._productService.getCustomProduct(this.productId).subscribe((res) => {
      this.product = res;
      console.log('custom product received: ', this.product);
      this.orderForm = this._orderService.createCustomOrderForm(this.product);
      console.log('order form raw value: ', this.orderForm.getRawValue());
      console.log('order form value: ', this.orderForm.value);
    });

    this._productService
      .getActiveProductAttrs()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((attrs) => {
        this.activeAttrs = attrs;
        console.log(
          'active attributes changed: ',
          new FormArray(this.activeAttrs).getRawValue()
        );
      });

    this._productService
      .getSelectedAttrs()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((attrs) => {
        this.selectedAttrs = attrs;
        console.log('selected attributes changed: ', this.selectedAttrs);
      });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   * get the attributes form array
   * @returns attributes formarray
   */
  attributes(): FormArray {
    return <FormArray>this.orderForm.get('data.custom_order_attributes');
  }

  /**
   * get the base attribute formgroup
   * @returns base attribute formgroup
   */
  baseAttrFormGroup(): FormGroup {
    return <FormGroup>this.attributes().at(0);
  }
}

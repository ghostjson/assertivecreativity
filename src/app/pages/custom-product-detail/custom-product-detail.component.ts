import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trackById } from 'src/app/library/TrackByFunctions';
import { CustomProduct, ProductAttribute } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import {
  fadeInRightOnEnterAnimation,
  fadeOutRightOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-custom-product-detail',
  templateUrl: './custom-product-detail.component.html',
  styleUrls: ['./custom-product-detail.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation({ duration: 250 }),
    fadeOutRightOnLeaveAnimation({ duration: 250 }),
  ],
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
  summaryVisible: boolean;
  totalPrice: number;

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
      this.orderForm = this._orderService.createCustomOrderForm(this.product);
    });

    this._productService
      .getActiveProductAttrs()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((attrs) => {
        this.activeAttrs = attrs;
      });

    this._productService
      .getSelectedAttrs()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((attrs) => {
        this.selectedAttrs = attrs;
        this.totalPrice = this.selectedAttrs.reduce((prev: number, curr) => {
          return prev + curr.form.value.input.price;
        }, 0);
        console.log('total price: ', this.totalPrice);
        console.log('selected attrs: ', this.selectedAttrs);
      });

    this._productService
      .getSummaryPanelState()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((panelState) => {
        this.summaryVisible = panelState;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  showSummaryPanel(): void {
    this._productService.setSummaryPanel(true);
  }

  hideSummaryPanel(): void {
    this._productService.setSummaryPanel(false);
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

  editSelectedAttr(form: FormGroup): void {
    this._productService.addActiveAttrGrp(form);
    this.hideSummaryPanel();
  }
}

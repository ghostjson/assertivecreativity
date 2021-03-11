import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CustomProduct,
  Product,
  ProductAttribute,
} from 'src/app/models/Product';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-custom-product-crud',
  templateUrl: './admin-custom-product-crud.component.html',
  styleUrls: ['./admin-custom-product-crud.component.scss'],
})
export class AdminCustomProductCrudComponent implements OnInit, OnDestroy {
  @Input() product: CustomProduct;

  productForm: FormGroup;
  activeAttr: ProductAttribute;
  activeChildAttr: ProductAttribute;
  productViews: MenuItem[];

  componentDestroy = new Subject<void>();

  constructor(private _productService: AdminProductService) {}

  ngOnInit(): void {
    if (this.product) {
      this.productForm = this._productService.createCustomProductForm(
        this.product
      );
    } else {
      this.productForm = this._productService.createCustomProductForm();
    }

    this._productService
      .getState()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((state) => {
        this.activeChildAttr = state.activeChildAttr;
        this.activeAttr = state.activeAttr;
      });

    this.productViews = [
      {
        label: 'Front View',
      },
      {
        label: 'Back View',
      },
    ];
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }
}

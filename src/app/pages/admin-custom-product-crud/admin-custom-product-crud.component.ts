import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomProduct, Product } from 'src/app/models/Product';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-custom-product-crud',
  templateUrl: './admin-custom-product-crud.component.html',
  styleUrls: ['./admin-custom-product-crud.component.scss']
})
export class AdminCustomProductCrudComponent implements OnInit {
  @Input() product: CustomProduct;

  productForm: FormGroup;

  constructor(private _productService: AdminProductService) { }

  ngOnInit(): void {
    if (this.product) {
      this.productForm = this._productService.createCustomProductForm(this.product);
    } else {
      this.productForm = this._productService.createCustomProductForm();
    }
  }
}

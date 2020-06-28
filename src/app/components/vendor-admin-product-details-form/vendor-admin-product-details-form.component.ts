import { Component, OnInit } from '@angular/core';
import { Product, ProductColor, ProductSize } from '../../models/Product';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-admin-product-details-form',
  templateUrl: './vendor-admin-product-details-form.component.html',
  styleUrls: ['./vendor-admin-product-details-form.component.scss']
})
export class VendorAdminProductDetailsFormComponent implements OnInit {
  newProductForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    stock: new FormControl(),
    image: new FormControl()
  });

  constructor(
    private _productService: VendorAdminProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  addProduct() {
    console.log(this.newProductForm);
    let newProduct = new Product(
      String(Math.floor(Math.random() * 1000)),
      this.newProductForm.value.name,
      this.newProductForm.value.description,
      this.newProductForm.value.price,
      this.newProductForm.value.stock,
      0,
      this.newProductForm.value.image,
      []
    );

    // add the product in the server
    this._productService.addProduct(newProduct);

    // redirect to the products page
    this.router.navigate(['/vendor/admin/products']);

    return newProduct;
  }
}

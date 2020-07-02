import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';

@Component({
  selector: 'app-vendor-admin-products-list',
  templateUrl: './vendor-admin-products-list.component.html',
  styleUrls: ['./vendor-admin-products-list.component.scss']
})
export class VendorAdminProductsListComponent implements OnInit {
  products: Product[]

  constructor(private _productService: VendorAdminProductService) { }

  ngOnInit(): void {
    this.products = this._productService.getProducts();
  }

  createNewProduct(): void {
    console.log(this._productService.createNewProduct());
  }

  deleteProduct(product: Product): void {
    console.log('Product ID: ', product.id);
    // delete from ui
    this.products = this.products.filter(p => p.id != product.id);
    // delete from the server
    this.products = this._productService.deleteProduct(product);
  }

}

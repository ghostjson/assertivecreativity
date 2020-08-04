import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/Product";
import { VendorAdminProductService } from "../../services/vendor-admin-product.service";

@Component({
  selector: "app-vendor-admin-products-list",
  templateUrl: "./vendor-admin-products-list.component.html",
  styleUrls: ["./vendor-admin-products-list.component.scss"],
})
export class VendorAdminProductsListComponent implements OnInit {
  products: Product[];

  constructor(private _productService: VendorAdminProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  // async getProducts() {
  //   // this.products = (await this._productService.getProducts()).data;
  //   this.products = this._productService.getProducts();
  // }

  getProducts() {
    // this.products = (await this._productService.getProducts()).data;
    this.products = this._productService.getProducts();
    console.info(this.products);
  }

  deleteProduct(product: Product): void {
    let res = this._productService.deleteProduct(product.id);
    // res.then(done => {
    //   this.getProducts();
    // })
  }
}

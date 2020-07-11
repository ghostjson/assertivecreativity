import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit {
  featured: any;
  products: any;

  constructor(
    private common: CommonService,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this.featured = this.common.featuredProduct();
    this._productService.getProducts().then((res) => {
      this.products = res["data"];
      console.log(this.products)
    });
  }

  ngAfterViewInit(): void {}
}

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
  products: Product[];

  constructor(
    private common: CommonService,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this.common.setLoader(true);

    this.featured = this._productService.getFeaturedProducts();
    // this._productService.getProducts().then((res) => {
    //   this.products = res["data"];

    //   this.common.setLoader(false);
    // });

    this.products = this._productService.getProducts();
    console.info(this.products);
    this.common.setLoader(false);
  }

  ngAfterViewInit(): void {}
}

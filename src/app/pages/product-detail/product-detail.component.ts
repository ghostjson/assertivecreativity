import { Component, OnInit } from "@angular/core";
import { NbSelectModule } from "@nebular/theme";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../models/Product";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  // image: string;
  public image_set;

  private slideDOM;

  product: any;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.getProduct();
  }

  async ngOnInit() {}

  getProduct() {
    this.image_set = [];

    // get product details from the product service
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this._productService.getProduct(id).then((res) => {
      this.product = res["data"];
    });
  }

  slideLeft() {}

  slideRight() {}
}

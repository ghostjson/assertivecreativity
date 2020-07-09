import { Component, OnInit } from "@angular/core";
import { NbSelectModule } from "@nebular/theme";
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  image: string = "./../../../assets/images/demo-product-images/p1.jpg";
  public image_set;

  private slideDOM;

  product: Product;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.image_set = [
      "./../../../assets/images/demo-product-images/p1.jpg",
      "./../../../assets/images/demo-product-images/p2.jpg",
      "./../../../assets/images/demo-product-images/p1.jpg"
    ];

    // get product details from the product service
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this.product = this._productService.getProduct(id);

    console.log(document.getElementsByClassName("slide-image"));
    console.log(this.product);
  }

  slideLeft() {}

  slideRight() {}
}

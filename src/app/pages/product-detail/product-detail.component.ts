import { Component, OnInit } from "@angular/core";
import { NbSelectModule } from "@nebular/theme";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  image: string = "./../../../assets/images/demo-product-images/p1.jpg";
  public image_set;

  private slideDOM;

  constructor() {}

  ngOnInit(): void {
    this.image_set = [
      "./../../../assets/images/demo-product-images/p1.jpg",
      "./../../../assets/images/demo-product-images/p2.jpg",
      "./../../../assets/images/demo-product-images/p1.jpg"
    ];

    console.log(document.getElementsByClassName("slide-image"));
  }

  slideLeft() {}

  slideRight() {}
}

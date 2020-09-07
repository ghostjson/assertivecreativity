import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../models/Product";
import { AdminProductService } from "../../services/admin-product.service";

@Component({
  selector: "app-vendor-admin-product",
  templateUrl: "./vendor-admin-product.component.html",
  styleUrls: ["./vendor-admin-product.component.scss"],
})
export class VendorAdminProductComponent implements OnInit {
  product: any;

  constructor(
    private _productService: AdminProductService,
    private _activatedRoute: ActivatedRoute
  ) {}

  // async ngOnInit(): Promise<any> {
  //   let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));
  //   console.log(id);
  //   this.product = (await this._productService.getProduct(id)).data;
  //   console.log(this.product);
  // }

  ngOnInit(): void {
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    console.log(id);
    this.product =  this._productService.getProduct(id);
    console.log(this.product);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';

@Component({
  selector: 'app-vendor-admin-product',
  templateUrl: './vendor-admin-product.component.html',
  styleUrls: ['./vendor-admin-product.component.scss']
})
export class VendorAdminProductComponent implements OnInit {
  product: Product;

  constructor(
    private _productService: VendorAdminProductService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: string = this._activatedRoute.snapshot.paramMap.get("id");
    console.log(id);
    this.product = this._productService.getProduct(id);
    console.log(this.product);
  }
}

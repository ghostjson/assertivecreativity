import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  featured: any;
  products: Product[]

  constructor(
    private common: CommonService,
    private _productService: ProductService
  ) { }

  ngOnInit(){
    this.featured = this.common.featuredProduct();
    this.products = this._productService.getProducts();
    console.log(this.featured)
  }

  ngAfterViewInit(): void {

  }




}

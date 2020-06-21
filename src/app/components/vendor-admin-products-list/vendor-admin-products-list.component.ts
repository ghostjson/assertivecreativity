import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-admin-products-list',
  templateUrl: './vendor-admin-products-list.component.html',
  styleUrls: ['./vendor-admin-products-list.component.scss']
})
export class VendorAdminProductsListComponent implements OnInit {
  products: {name: string, image: string, price: number, stock: number, sales: number, link: string}[]

  constructor() { }

  ngOnInit(): void {
    this.products = [
        {
          name: 'Some product',
          image: '../../../assets/images/default-150x150.png',
          price: 100,
          stock: 25000,
          sales: 12000,
          link: '/vendor/admin/products/show'
        },
        {
          name: 'Some product',
          image: '../../../assets/images/default-150x150.png',
          price: 45,
          stock: 25000,
          sales: 435345,
          link: '/vendor/admin/products/show'
        },
        {
          name: 'Some product',
          image: '../../../assets/images/default-150x150.png',
          price: 45,
          stock: 25000,
          sales: 127565,
          link: '/vendor/admin/products/show'
        },
        {
          name: 'Some product',
          image: '../../../assets/images/default-150x150.png',
          price: 45,
          stock: 25000,
          sales: 7567556,
          link: '/vendor/admin/products/show'
        },
    ];
  }

}

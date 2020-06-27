import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class VendorAdminProductService {
  products = [
    {
      id: 1,
      name: 'Some product',
      image: '../../../assets/images/default-150x150.png',
      price: 100,
      stock: 25000,
      sales: 12000,
      link: '/vendor/admin/products/show'
    },
    {
      id: 2,
      name: 'Some product',
      image: '../../../assets/images/default-150x150.png',
      price: 45,
      stock: 25000,
      sales: 435345,
      link: '/vendor/admin/products/show'
    },
    {
      id: 3,
      name: 'Some product',
      image: '../../../assets/images/default-150x150.png',
      price: 45,
      stock: 25000,
      sales: 127565,
      link: '/vendor/admin/products/show'
    },
    {
      id: 4,
      name: 'Some product',
      image: '../../../assets/images/default-150x150.png',
      price: 45,
      stock: 25000,
      sales: 7567556,
      link: '/vendor/admin/products/show'
    },
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): Product[] {
    this.products.push(product);

    return this.products;
  }

  deletProduct(product: Product): Product[] {
    this.products = this.products.filter((p) => {
      p.id != product.id;
    });

    return this.products;
  }
}

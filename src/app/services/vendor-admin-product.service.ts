import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class VendorAdminProductService {
  products = [
    {
      id: '1',
      name: 'Product 1',
      image: '../../../assets/images/default-150x150.png',
      price: 100,
      stock: 25000,
      sales: 12000
    },
    {
      id: '2',
      name: 'Product 2',
      image: '../../../assets/images/default-150x150.png',
      price: 45,
      stock: 25000,
      sales: 435345
    },
    {
      id: '3',
      name: 'Product 3',
      image: '../../../assets/images/default-150x150.png',
      price: 45,
      stock: 25000,
      sales: 127565
    },
    {
      id: '4',
      name: 'Product 4',
      image: '../../../assets/images/default-150x150.png',
      price: 45,
      stock: 25000,
      sales: 7567556
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
    this.products = this.products.filter(p => {
      return p.id != product.id;
    });

    return this.products;
  }

  getProduct(id: string): Product {
    return this.products.find(p => {
      return p.id === id
    });
    // return {
    //   id: '1',
    //   name: 'Product 1',
    //   image: '../../../assets/images/default-150x150.png',
    //   price: 100,
    //   stock: 25000,
    //   sales: 12000
    // };
  }
}

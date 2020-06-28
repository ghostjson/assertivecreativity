import { Injectable } from '@angular/core';
import { Product, ProductColor, ProductSize } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class VendorAdminProductService {
  products = [
    new Product(
      '1',
      'Product 1',
      'This is a random product that does not exist',
      100,
      25000,
      12000,
      '../../../assets/images/default-150x150.png',
      [
        new ProductColor(
          'Pick a color',
          [
            {
              colorName: 'Red',
              colorHex: '#ff0000'
            },
            {
              colorName: 'Blue',
              colorHex: '#0000ff'
            },
            {
              colorName: 'Green',
              colorHex: '#00ff00'
            }
          ]
        ),
        new ProductSize([
          {
            name: 'L',
            value: 50
          },
          {
            name: 'M',
            value: 40
          },
          {
            name: 'S',
            value: 20
          }
        ])
      ]
    ),
    new Product(
      '2',
      'Product 2',
      'This is a random product that does not exist',
      100,
      25000,
      12000,
      '../../../assets/images/default-150x150.png',
      [
        new ProductColor(
          'Pick a color',
          [
            {
              colorName: 'Red',
              colorHex: '#ff0000'
            },
            {
              colorName: 'Blue',
              colorHex: '#0000ff'
            },
            {
              colorName: 'Green',
              colorHex: '#00ff00'
            }
          ]
        ),
        new ProductSize([
          {
            name: 'L',
            value: 50
          },
          {
            name: 'M',
            value: 40
          },
          {
            name: 'S',
            value: 20
          }
        ])
      ]
    ),
    new Product(
      '3',
      'Product 3',
      'This is a random product that does not exist',
      100,
      25000,
      12000,
      '../../../assets/images/default-150x150.png',
      [
        new ProductColor(
          'Pick a color',
          [
            {
              colorName: 'Red',
              colorHex: '#ff0000'
            },
            {
              colorName: 'Blue',
              colorHex: '#0000ff'
            },
            {
              colorName: 'Green',
              colorHex: '#00ff00'
            }
          ]
        ),
        new ProductSize([
          {
            name: 'L',
            value: 50
          },
          {
            name: 'M',
            value: 40
          },
          {
            name: 'S',
            value: 20
          }
        ])
      ]
    )
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): Product {
    this.products.push(product);

    return this.products[this.products.length - 1];
  }

  deleteProduct(product: Product): Product[] {
    this.products = this.products.filter(p => {
      return p.id != product.id;
    });

    return this.products;
  }

  getProduct(id: string): Product {
    return this.products.find(p => {
      return p.id === id
    });
  }
}

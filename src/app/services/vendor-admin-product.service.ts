import { Injectable } from '@angular/core';
import { Product, ProductColor, ProductSize } from '../models/Product';
@Injectable({
  providedIn: 'root'
})

export class VendorAdminProductService {
  // products = [
  //   new Product(
  //     '1',
  //     'Product 1',
  //     'This is a random product that does not exist',
  //     100,
  //     25000,
  //     12000,
  //     '../../../assets/images/default-150x150.png',
  //     [
  //       new ProductColor(
  //         'Pick a color',
  //         [
  //           {
  //             id: 1,
  //             colorName: 'Red',
  //             colorHex: '#ff0000'
  //           },
  //           {
  //             id: 2,
  //             colorName: 'Blue',
  //             colorHex: '#0000ff'
  //           },
  //           {
  //             id: 3,
  //             colorName: 'Green',
  //             colorHex: '#00ff00'
  //           }
  //         ]
  //       ),
  //       new ProductSize(
  //         'Pick a size',
  //         [
  //           {
  //             name: 'L',
  //             value: 50
  //           },
  //           {
  //             name: 'M',
  //             value: 40
  //           },
  //           {
  //             name: 'S',
  //             value: 20
  //           }
  //         ])
  //     ]
  //   ),
  //   new Product(
  //     '2',
  //     'Product 2',
  //     'This is a random product that does not exist',
  //     100,
  //     25000,
  //     12000,
  //     '../../../assets/images/default-150x150.png',
  //     [
  //       new ProductColor(
  //         'Pick a color',
  //         [
  //           {
  //             id: 1,
  //             colorName: 'Red',
  //             colorHex: '#ff0000'
  //           },
  //           {
  //             id: 2,
  //             colorName: 'Blue',
  //             colorHex: '#0000ff'
  //           },
  //           {
  //             id: 3,
  //             colorName: 'Green',
  //             colorHex: '#00ff00'
  //           }
  //         ]
  //       ),
  //       new ProductSize(
  //         'Pick a size',
  //         [
  //           {
  //             name: 'L',
  //             value: 50
  //           },
  //           {
  //             name: 'M',
  //             value: 40
  //           },
  //           {
  //             name: 'S',
  //             value: 20
  //           }
  //         ])
  //     ]
  //   ),
  //   new Product(
  //     '3',
  //     'Product 3',
  //     'This is a random product that does not exist',
  //     100,
  //     25000,
  //     12000,
  //     '../../../assets/images/default-150x150.png',
  //     [
  //       new ProductColor(
  //         'Pick a color',
  //         [
  //           {
  //             id: 1,
  //             colorName: 'Red',
  //             colorHex: '#ff0000'
  //           },
  //           {
  //             id: 2,
  //             colorName: 'Blue',
  //             colorHex: '#0000ff'
  //           },
  //           {
  //             id: 3,
  //             colorName: 'Green',
  //             colorHex: '#00ff00'
  //           }
  //         ]
  //       ),
  //       new ProductSize(
  //         'Pick a size',
  //         [
  //           {
  //             name: 'L',
  //             value: 50
  //           },
  //           {
  //             name: 'M',
  //             value: 40
  //           },
  //           {
  //             name: 'S',
  //             value: 20
  //           }
  //         ])
  //     ]
  //   )
  // ];

  products: Product[] = [
    {
      id: '150',
      name: 'Another Product',
      description: 'This is a new product',
      price: 1290,
      stock: 10000,
      sales: 0,
      image: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80',
      features: [
        {
          id: '101',
          type: 'color',
          colors: [
            {
              id: 0,
              colorName: 'color',
              colorHex: '#4533cc'
            },
            {
              id: 0,
              colorName: 'second',
              colorHex: '#cc9933'
            }
          ]
        }
      ]
    },
    {
      id: '151',
      name: 'New Product',
      description: 'This is a new product',
      price: 1290,
      stock: 10000,
      sales: 0,
      image: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80',
      features: [
        {
          id: '101',
          type: 'color',
          colors: [
            {
              id: 0,
              colorName: 'color',
              colorHex: '#4533cc'
            },
            {
              id: 0,
              colorName: 'second',
              colorHex: '#cc9933'
            }
          ]
        }
      ]
    }
  ];

  newProduct: Product;
  createId: number = 4;

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  createNewProduct(): string {
    this.newProduct = new Product(
      String(this.createId),
      '',
      '',
      0,
      0,
      0,
      '',
      []
    );

    ++this.createId;
    return this.newProduct.id;
  }

  addFeature(feature: ProductColor): Product {
    console.log('feature to push', feature);
    this.newProduct.features.push(feature);
    return this.newProduct;
  }

  addProduct(product: any): Product {
    this.newProduct.id = String(Math.floor(Math.random() * 1000));
    this.newProduct.name = product.name;
    this.newProduct.description = product.description;
    this.newProduct.price = Number(product.price);
    this.newProduct.stock = Number(product.stock);
    this.newProduct.sales = 0;
    this.newProduct.image = product.image;

    this.products.push(this.newProduct);
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

import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
@Injectable({
  providedIn: 'root'
})

export class VendorAdminProductService {
  products: Product[] = [
    {
      id: 385561953,
      name: 'Super Demo Shirt',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt earum natus ut architecto.',
      price: 100,
      stock: 1000,
      sales: 0,
      image: 'assets/images/demo-product-images/p2.jpg',
      features: [
        {
          type: 'color',
          title: 'Pick a color',
          name: 'Colors',
          inputs: [
            {
              colorName: 'red',
              type: 'text',
              colorHex: '#c40a0a'
            },
            {
              colorName: 'blue',
              type: 'text',
              colorHex: '#3d0eda'
            },
            {
              colorName: 'green',
              type: 'text',
              colorHex: '#44d015'
            }
          ]
        },
        {
          type: 'radioBtn',
          title: 'Select a radio button',
          name: 'Radio Buttons',
          inputs: [
            {
              choiceText: 'Red',
              type: 'text',
              choiceValue: 'red'
            },
            {
              choiceText: 'Blue',
              type: 'text',
              choiceValue: 'blue'
            },
            {
              choiceText: 'Green',
              type: 'text',
              choiceValue: 'green'
            },
            {
              choiceText: 'Violet',
              type: 'text',
              choiceValue: 'violet'
            }
          ]
        },
        {
          type: 'dropdown',
          title: 'Select a size',
          name: 'Dropdown Selection',
          inputs: [
            {
              choiceText: 'Large',
              type: 'text',
              choiceValue: 'L'
            },
            {
              choiceText: 'Medium',
              type: 'text',
              choiceValue: 'M'
            },
            {
              choiceText: 'Small',
              type: 'text',
              choiceValue: 'S'
            }
          ]
        }
      ]
    },
    {
      id: 385561953,
      name: 'That product',
      description: 'assets/images/demo-product-images/p2.jpg',
      price: 100,
      stock: 1000,
      sales: 0,
      image: 'assets/images/demo-product-images/2.jpg',
      features: [
        {
          type: 'color',
          title: 'Pick a color',
          name: 'Colors',
          inputs: [
            {
              colorName: 'red',
              type: 'text',
              colorHex: '#c40a0a'
            },
            {
              colorName: 'blue',
              type: 'text',
              colorHex: '#3d0eda'
            },
            {
              colorName: 'green',
              type: 'text',
              colorHex: '#44d015'
            }
          ]
        },
        {
          type: 'radioBtn',
          title: 'Select a radio button',
          name: 'Radio Buttons',
          inputs: [
            {
              choiceText: 'colorful',
              type: 'text',
              choiceValue: 'colorful'
            },
            {
              choiceText: 'not coloful',
              type: 'text',
              choiceValue: 'not-colorful'
            }
          ]
        },
        {
          type: 'dropdown',
          title: 'Select a size',
          name: 'Dropdown Selection',
          inputs: [
            {
              choiceText: 'Large',
              type: 'text',
              choiceValue: 'L'
            },
            {
              choiceText: 'Medium',
              type: 'text',
              choiceValue: 'M'
            },
            {
              choiceText: 'Small',
              type: 'text',
              choiceValue: 'S'
            }
          ]
        }
      ]
    },
    {
      id: 385561953,
      name: 'This product',
      description: 'This is the description of a product. It works good',
      price: 100,
      stock: 1000,
      sales: 0,
      image: 'assets/images/demo-product-images/2.jpg',
      features: [
        {
          type: 'color',
          title: 'Pick a color',
          name: 'Colors',
          inputs: [
            {
              colorName: 'red',
              type: 'text',
              colorHex: '#c40a0a'
            },
            {
              colorName: 'blue',
              type: 'text',
              colorHex: '#3d0eda'
            },
            {
              colorName: 'green',
              type: 'text',
              colorHex: '#44d015'
            }
          ]
        },
        {
          type: 'radioBtn',
          title: 'Select a radio button',
          name: 'Radio Buttons',
          inputs: [
            {
              choiceText: 'colorful',
              type: 'text',
              choiceValue: 'colorful'
            },
            {
              choiceText: 'not coloful',
              type: 'text',
              choiceValue: 'not-colorful'
            }
          ]
        },
        {
          type: 'dropdown',
          title: 'Select a size',
          name: 'Dropdown Selection',
          inputs: [
            {
              choiceText: 'Large',
              type: 'text',
              choiceValue: 'L'
            },
            {
              choiceText: 'Medium',
              type: 'text',
              choiceValue: 'M'
            },
            {
              choiceText: 'Small',
              type: 'text',
              choiceValue: 'S'
            }
          ]
        }
      ]
    }
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

  getProduct(id: number): Product {
    return this.products.find(p => {
      return p.id === id
    });
  }
}

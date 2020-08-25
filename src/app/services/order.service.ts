import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Array<any>;
  stagedOrders: Array<any>;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService
  ) {
    this.orders = [];
    this.stagedOrders = [];

    // initialise the orders
    this.initialiseOrders();
  }

  /**
   * Initialise with orders of the user from the server
   */
  private initialiseOrders(): void {
    this.orders.push(
      {
        id: 3,
        name: 'Cool Neon T-Shirt',
        description: 'eFlow T-shirt is comfortable to wear and quality t-shirt',
        price: 20,
        totalPrice: 150,
        stock: 25,
        sales: 0,
        status: 'pending',
        orderDate: '2020-09-13',
        deliveryDate: '2020-09-25',
        image: 'https://cdn.muscleandstrength.com/store/media/catalog/product/cache/all/image/400x400/602f0fa2c1f0d1ba5e241f914e856ff9/m/s/ms-eflow-front_4.jpg',
        features: [
          {
            chainInpsHidden: false,
            type: 'color',
            title: 'Color',
            name: 'Colors',
            price: 10,
            input: '#000000',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 15,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 20,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 30,
                input: 'A thousand number',
                chainedInputs: []
              }
            ]
          },
          {
            chainInpsHidden: false,
            type: 'text',
            title: 'What is the quantity of order expected ?',
            name: 'Answer here in short text',
            price: 5,
            input: 'How much do you need',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 30,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 10,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 10,
                input: 'Answer is entered here.',
                chainedInputs: []
              }
            ]
          }
        ]
      }
    );

    this.orders.push(
      {
        id: 4,
        name: 'eFlow T-Shirt',
        description: 'eFlow T-shirt is comfortable to wear and quality t-shirt',
        price: 10,
        totalPrice: 200,
        stock: 25,
        sales: 0,
        status: 'declined',
        image: 'https://cdn.muscleandstrength.com/store/media/catalog/product/cache/all/image/400x400/602f0fa2c1f0d1ba5e241f914e856ff9/m/s/ms-eflow-front_4.jpg',
        features: [
          {
            chainInpsHidden: false,
            type: 'color',
            title: 'Color',
            name: 'Colors',
            price: 25,
            input: '#000000',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 7,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 15,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 15,
                input: 'A thousand number',
                chainedInputs: []
              }
            ]
          },
          {
            chainInpsHidden: false,
            type: 'text',
            title: 'What is the quantity of order expected ?',
            name: 'Answer here in short text',
            price: 20,
            input: 'How much do you need',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 13,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 20,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 20,
                input: 'Answer is entered here.',
                chainedInputs: []
              }
            ]
          }
        ]
      }
    );
  }


  newOrderForm(product: Product): FormGroup {
    let orderFormTemplate = {
      id: product.id,
      name: product.name,
      description: product.description,
      basePrice: product.basePrice,
      image: product.image,
      customForms: this._fb.array([])
    };

    product.customForms.forEach((customForm) => {
      this._productService.addForm(
        customForm, 
        orderFormTemplate.customForms
      );
    });

    return this._fb.group(orderFormTemplate);
  }

  /**
   * return an order from orders
   * @return {Object} order placed by the user
   */
  getOrder(id: number | string): any {
    console.info('id received: ', id);
    let foundOrder = this.stagedOrders.find((order) => {
      console.info('order iterate: ', order);
      console.log(order.id === id);
      return order.id === id;
    });
    console.log('found order: ', foundOrder);
    return foundOrder;
    // return this.stagedOrders[this.stagedOrders.length - 1];
  }

  getOrders(): Object[] {
    return this.orders;
  }

  /**
   * Stage an order to be added to confirmed orders
   * @param {any} order order to stage
   */
  stageOrder(order: any): void {
    this.stagedOrders.push(order);
  }

  /**
   * Places the order on the server
   * @param {Object} order Order object
   */
  placeOrder(order: Object): void {
    this.orders.push(order);
    console.log('order placed: ', order);
  }
}

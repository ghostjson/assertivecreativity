import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Array<any>;
  stagedOrders: Array<any>;

  constructor() {
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
        name: 'sasi T-Shirt',
        description: 'eFlow T-shirt is comfortable to wear and quality t-shirt',
        price: 20,
        totalPrice: 10000,
        stock: 25,
        sales: 0,
        status: 'pending',
        orderDate: '2015-09-13',
        deliveryDate: '2015-09-13',
        image: 'https://cdn.muscleandstrength.com/store/media/catalog/product/cache/all/image/400x400/602f0fa2c1f0d1ba5e241f914e856ff9/m/s/ms-eflow-front_4.jpg',
        features: [
          {
            chainInpsHidden: false,
            type: 'color',
            title: 'Color',
            name: 'Colors',
            price: 999,
            input: '#000000',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 1000,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 2000,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 500,
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
            price: 999,
            input: 'How much do you need',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 1000,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 2000,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 500,
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
        price: 20,
        totalPrice: 9018,
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
            price: 999,
            input: '#000000',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 1000,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 2000,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 500,
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
            price: 999,
            input: 'How much do you need',
            chainedInputs: [
              {
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 1000,
                input: '#000000',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 2000,
                input: 'Men',
                chainedInputs: []
              },
              {
                chainInpsHidden: 'true',
                type: 'text',
                title: 'What is the quantity of order expected ?',
                name: 'Answer here in short text',
                price: 500,
                input: 'Answer is entered here.',
                chainedInputs: []
              }
            ]
          }
        ]
      }
    );
  }

  /**
   * return an order from orders
   * @return {Object} order placed by the user
   */
  getOrder(): Object {
    // return this.orders.find(order => order.id === orderId);
    return this.stagedOrders[this.stagedOrders.length - 1];
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

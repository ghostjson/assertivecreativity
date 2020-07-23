import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Array<any>;

  constructor() {
    this.orders = [];
    this.orders.push(
      {
        id: 3,
        name: 'eFlow T-Shirt',
        description: 'eFlow T-shirt oru poli shirt',
        price: 20,
        totalPrice: 9018,
        stock: 25,
        sales: 0,
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
                input: 'This much. How many times do I have to tell you ?',
                chainedInputs: []
              }
            ]
          }
        ]
      }
    );
  }

  addOrder(order: any): void {
    this.orders.push(order);
  }

  getOrder() {
    // return this.orders[this.orders.length - 1];
    return this.orders[0];
  }
}

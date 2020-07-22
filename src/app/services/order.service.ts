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
        id: 6,
        name: 'Print Crew-Neck T-shirt',
        description: 'Print Crew-Neck T-shirt',
        price: 10,
        totalPrice: 1999,
        stock: 20,
        sales: 0,
        image: 'https://assets.ajio.com/medias/sys_master/root/h64/h9b/14819625664542/-473Wx593H-441039335-black-MODEL.jpg',
        features: [
          {
            featureIndex: 0,
            chainInpsHidden: 'true',
            type: 'color',
            title: 'Color',
            name: 'Colors',
            price: 999,
            input: 'Women',
            chainedInputs: [
              {
                featureIndex: 2,
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 1000,
                input: '',
                chainedInputs: []
              },
              {
                featureIndex: 2,
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 2000,
                input: '',
                chainedInputs: []
              }
            ]
          },
          {
            featureIndex: 1,
            chainInpsHidden: 'true',
            type: 'dropdown',
            title: 'Gender',
            name: 'Dropdown Selection',
            price: 999,
            input: 'Women',
            chainedInputs: [
              {
                featureIndex: 2,
                chainInpsHidden: 'true',
                type: 'color',
                title: 'Choose a color dynamically',
                name: 'Colors',
                price: 1000,
                input: '',
                chainedInputs: []
              },
              {
                featureIndex: 2,
                chainInpsHidden: 'true',
                type: 'dropdown',
                title: 'Gender',
                name: 'Dropdown Selection',
                price: 2000,
                input: '',
                chainedInputs: []
              }
            ]
          }
        ]
      }
    )
  }

  addOrder(order: any): void {
    this.orders.push(order);
  }

  getOrder() {
    return this.orders[this.orders.length - 1];
  }
}

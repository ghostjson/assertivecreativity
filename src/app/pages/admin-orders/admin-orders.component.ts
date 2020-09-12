import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: {
    pending: Order[],
    accepted: Order[],
    completed: Order[],
    cancelled: Order[]
  };
  // pendingOrders: Order[];
  // acceptedOrders: Order[];
  // completedOrders: Order[];
  // cancelledOrders: Order[];


  constructor(
    private _http: HttpClient,
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this._orderService.getOrders()
      .subscribe((orders: Order[]) => {
        console.log('orders received: ', orders);
        this.orders = {
          pending: [],
          accepted: [],
          completed: [],
          cancelled: []
        };
        
        orders.forEach((order: Order) => {
          this.orders[order.status].push(order);
        });
      });
  }

}

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
    open: Order[],
    closed: Order[],
    cancelled: Order[]
  };


  constructor(
    private _http: HttpClient,
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this._orderService.getOrders()
      .subscribe((orders: Order[]) => {
        console.log('orders received: ', orders);
        this.orders = {
          open: [],
          closed: [],
          cancelled: []
        };
        
        orders.forEach((order: Order) => {
          this.orders[order.order_status].push(order);
        });
      });
  }

}

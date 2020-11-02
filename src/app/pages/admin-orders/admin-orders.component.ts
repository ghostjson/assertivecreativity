import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private _http: HttpClient,
    private _orderService: AdminOrdersService
  ) { }

  ngOnInit(): void {
    this._orderService.getAllOrders()
      .subscribe((orders: Order[]) => {
        console.log('orders received: ', orders);
        this.orders = orders;
      });
  }

}

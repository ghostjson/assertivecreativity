import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Table } from 'primeng/table';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this._orderService.getOrders()
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      });
  }
}

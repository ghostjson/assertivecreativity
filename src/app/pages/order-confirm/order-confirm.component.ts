import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  order: Object;

  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.order = this._orderService.getOrder();
    console.log(this.order);
  }

}

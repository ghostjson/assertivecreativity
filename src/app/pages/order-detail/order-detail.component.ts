import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id: number;
  order: Order;

  constructor(
    private _activatedRouteService: ActivatedRoute,
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.id = Number(this._activatedRouteService.snapshot.paramMap.get('id'));
    this._orderService.getOrder(this.id)
      .subscribe((order: Order) => {
        this.order = order;
        console.log('order fetched: ', this.order);
      });
  }

}

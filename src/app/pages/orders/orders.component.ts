import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from 'src/app/models/Order';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  orders: Order[];
  productDetails: Object;

  constructor(
    private _orderService: OrderService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.orders = [];

    this._orderService.getOrders()
      .subscribe((orders: Order[]) => {
        orders.forEach((order: Order) => {
          order.product_details = null;

          this._productService.getProduct(order.product_id)
            .subscribe((product: Product) => {
              order.product_details = product;
              this.orders.push(order);
            });
        });
        console.info('Orders: ', orders);
      });
  }
}

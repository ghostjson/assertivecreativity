import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  productDetails: Object;

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this._orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      console.info("Orders: ", orders);
    });
  }
}

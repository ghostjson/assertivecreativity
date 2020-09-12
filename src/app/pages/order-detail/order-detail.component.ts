import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";
import { MailService } from "../../services/mail.service";
import { MailThread, Mail } from "src/app/models/Mail";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  id: number;
  order: Order;
  mails: Mail[];

  constructor(
    private _activatedRouteService: ActivatedRoute,
    private _orderService: OrderService,
    private _mailService: MailService
  ) {}

  ngOnInit(): void {
    this.id = Number(this._activatedRouteService.snapshot.paramMap.get("id"));
    this._orderService.getOrder(this.id).subscribe((order: Order) => {
      this.order = order;
      console.log("order fetched: ", this.order);

      if (order.mailThread != undefined || order.mailThread != null) {
        // get messages related to the order
        this._mailService
          .getMails(order.mailThread)
          .subscribe((mails: Mail[]) => {
            this.mails = mails;
            console.info("mails: ", this.mails);
          });
      }
    });
  }
}

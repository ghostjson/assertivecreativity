import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  mails: MailThread;
  author: number;
  receiver: number;

  constructor(
    private _activatedRouteService: ActivatedRoute,
    private _orderService: OrderService,
    private _mailService: MailService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.mails = [];
    this.id = Number(this._activatedRouteService.snapshot.paramMap.get("id"));
    this._orderService.getOrder(this.id).subscribe((order: Order) => {
      this.order = order;
      console.log("order fetched: ", this.order);

      // get mail thread 
      this._mailService.getThreadByOrderId(this.id).subscribe((mails: MailThread) => {
        console.log('mail thread received', mails);
        this.mails = mails;

        mails.sort((mail1: Mail, mail2: Mail) => {
          return Number(new Date(mail1.created_at) < new Date(mail2.created_at));
        });
      });
    });

    if(this._router.url.includes('admin')) {
      console.info('author is admin');
      this.author = 1;
      this.receiver = 0;
    }
    else {
      console.info('author is user');
      this.author = 0;
      this.receiver = 1;
    }
  }
}

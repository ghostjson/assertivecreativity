import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";
import { MailService } from "../../services/mail.service";
import { MailThread, Mail, AdminMailThreadResponse } from "src/app/models/Mail";
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { User } from 'src/app/models/User';

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  id: number;
  order: Order;
  buyerMails: MailThread;
  vendorMails: MailThread;
  receiver: number;
  adminMode: boolean;
  vendorMode: boolean;

  constructor(
    private _activatedRouteService: ActivatedRoute,
    private _orderService: OrderService,
    private _adminOrderService: AdminOrdersService,
    private _mailService: MailService,
    private _router: Router,
    private _userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.adminMode = this._router.url.includes('admin');
    this.vendorMode = this._router.url.includes('vendor');
    let user: User = this._userDetailsService.getUserLocal();

    this.buyerMails = [];
    this.vendorMails = [];
    this.id = Number(this._activatedRouteService.snapshot.paramMap.get("id"));
    if(this.adminMode) {
      this._adminOrderService.getOrder(this.id, user.role).subscribe((order: Order) => {
        this.order = order;
        console.log("order fetched: ", this.order);

        this._mailService.adminGetThreadByOrderId(this.id).subscribe((mailThread: AdminMailThreadResponse) => {
          console.log('mail for admin fetched: ', mailThread);
          this.buyerMails = mailThread.users;
          this.vendorMails = mailThread.vendors;

          this.buyerMails.sort((mail1: Mail, mail2: Mail) => {
            return Number(new Date(mail1.created_at) < new Date(mail2.created_at));
          });

          this.vendorMails.sort((mail1: Mail, mail2: Mail) => {
            return Number(new Date(mail1.created_at) < new Date(mail2.created_at));
          });
        })
      });
    }
    else {
      this._orderService.getOrder(this.id).subscribe((order: Order) => {
        this.order = order;
        console.log("order fetched: ", this.order);
  
        // get mail thread 
        this._mailService.getThreadByOrderId(this.id).subscribe((mails: MailThread) => {
          console.log('mail thread received', mails);
          this.buyerMails = mails;
  
          mails.sort((mail1: Mail, mail2: Mail) => {
            return Number(new Date(mail1.created_at) < new Date(mail2.created_at));
          });
        });
      });
    }
  }
}

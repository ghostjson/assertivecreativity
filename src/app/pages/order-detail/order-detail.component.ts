import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";
import { MailService } from "../../services/mail.service";
import { MailThread, Mail, AdminMailThreadResponse } from "src/app/models/Mail";
import { AdminOrdersService } from "src/app/services/admin-orders.service";
import { UserDetailsService } from "src/app/store/user-details.service";
import { User } from "src/app/models/User";
import { MenuItem } from "primeng/api";
import { CommonService } from "src/app/common.service";

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
  orderProgress: number;
  orderSteps: MenuItem[];

  constructor(
    private _activatedRouteService: ActivatedRoute,
    private _orderService: OrderService,
    private _adminOrderService: AdminOrdersService,
    private _mailService: MailService,
    private _router: Router,
    private _userDetailsService: UserDetailsService,
    private _commonService: CommonService
  ) {
    this.orderProgress = 0;
  }

  ngOnInit(): void {
    this.orderSteps = [
      {
        label: "Order Placed"
      },
      {
        label: "Discussion"
      },
      {
        label: "Payment"
      },
      {
        label: "Confirmation"
      },
    ];
    
    this.adminMode = this._router.url.includes("admin");
    this.vendorMode = this._router.url.includes("vendor");
    let user: User = this._userDetailsService.getUserLocal();

    this.buyerMails = [];
    this.vendorMails = [];
    this.id = Number(this._activatedRouteService.snapshot.paramMap.get("id"));
    if (this.adminMode) {
      this._adminOrderService
        .getOrder(this.id, user.role)
        .subscribe((order: Order) => {
          this.order = order;
          console.log("order fetched: ", this.order);
          // set the progress bar according to order status
          this.setOrderProgress();
          console.info("order progress: ", this.orderProgress);

          this._mailService
            .adminGetThreadByOrderId(this.id)
            .subscribe((mailThread: AdminMailThreadResponse) => {
              console.log("mail for admin fetched: ", mailThread);
              this.buyerMails = mailThread.users;
              this.vendorMails = mailThread.vendors;

              this.buyerMails.sort((mail1: Mail, mail2: Mail) => {
                return Number(
                  new Date(mail1.created_at) < new Date(mail2.created_at)
                );
              });

              this.vendorMails.sort((mail1: Mail, mail2: Mail) => {
                return Number(
                  new Date(mail1.created_at) < new Date(mail2.created_at)
                );
              });

              /**
               * TODO: Remove after API is finalized
               */
              this.buyerMails = this.processMails(this.buyerMails);
              this.vendorMails = this.processMails(this.vendorMails);
            });
        });
    } else {
      this._orderService.getOrder(this.id).subscribe((order: Order) => {
        this.order = order;
        console.log("order fetched: ", this.order);

        // set the progress bar according to order status
        this.setOrderProgress();

        console.info("order progress: ", this.orderProgress);

        // get mail thread
        this._mailService
          .getThreadByOrderId(this.id)
          .subscribe((mails: MailThread) => {
            console.log("mail thread received", mails);
            this.buyerMails = mails;

            mails.sort((mail1: Mail, mail2: Mail) => {
              return Number(
                new Date(mail1.created_at) < new Date(mail2.created_at)
              );
            });

            /**
             * TODO: Remove after API is finalized
             */
            this.buyerMails = this.processMails(this.buyerMails);
          });
      });
    }

    this._commonService.setLoader(false);
  }

  /**
   * TODO: Remove after API is properly implemented
   */
  processMails(mails: Mail[]): Mail[] {
    mails = mails.map((mail: Mail) => {
      let processedMailContent = JSON.parse(mail.message_content);

      mail.message_content = processedMailContent;

      return mail;
    });

    console.log("Mail processed: ", mails);

    return mails;
  }

  setOrderProgress(): void {
    if (this.order.order_status === "pending") {
      this.orderProgress = 50;
    } else if (this.order.order_status === "complete") {
      this.orderProgress = 100;
    } else {
      this.orderProgress = 0;
    }
  }
}

import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Mail } from "src/app/models/Mail";
import { MailService } from "src/app/services/mail.service";
import { MessageService } from "primeng/api";
import { ScrollPanel } from "primeng/scrollpanel";
import { Order } from "src/app/models/Order";
import { UserDetailsService } from "src/app/store/user-details.service";
import { User } from "src/app/models/User";
import { OrderMailForm, OrderMailFormResponse } from "src/app/models/OrderMailForm";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-order-mail-list",
  templateUrl: "./order-mail-list.component.html",
  styleUrls: ["./order-mail-list.component.scss"],
  providers: [MessageService],
})
export class OrderMailListComponent implements OnInit {
  @ViewChild("mailContainer") mailContainer: ScrollPanel;

  @Input() mails: Mail[];
  @Input() order: Order;
  @Input() styleClass: string;
  @Input() receiverId: number;

  mailText: string;
  adminMode: boolean;
  user: User;
  orderMailForm: FormGroup;
  showFormMakerDialog: boolean;
  savedForms: OrderMailFormResponse[];
  savedFormsDialog: boolean;
  selectedSavedForm: OrderMailFormResponse;
  savedFormPreview: boolean;

  constructor(
    private _mailService: MailService,
    private _messageService: MessageService,
    private _userDetailsService: UserDetailsService,
    private _formMakerService: AdminOrdersFormMakerService
  ) {}

  ngOnInit(): void {
    this.user = this._userDetailsService.getUserLocal();

    console.log("order received at mail list", this.order);

    /**
     * TODO: Fix after api is finailzed for mail forms
     */
    // if(this.user.role === 'admin') {
    this.orderMailForm = this._formMakerService.createOrderMailForm();
    // }
    this._formMakerService.getAllForms().subscribe((res: OrderMailFormResponse[]) => {
      this.savedForms = res;
      console.log('forms received: ', this.savedForms);
    });


    this.showFormMakerDialog = false;
  }

  /**
   * Send mail to an order thread
   */
  sendMail(): void {
    let time: Date | string = new Date();
    time = time.toISOString();

    /**
     * TODO: Implement sending forms in a proper way after
     * API is finalised
     */
    // let newMail: Mail = {
    //   order_id: Number(this.order.id),
    //   message_content: this.mailText
    // };
    console.log("order mail form: ", this.orderMailForm.value);
    let messageContent = {
      message: this.mailText,
      forms: []
    };

    if(this.orderMailForm.touched) {
      messageContent.forms.push(this.orderMailForm.value);
    }

    let newMail: Mail = {
      order_id: Number(this.order.id),
      message_content: JSON.stringify(messageContent)
    };

    if (this.user.role === "admin") {
      this._mailService
        .sendMailToUser(newMail, Number(this.receiverId))
        .subscribe((res: Mail) => {
          this.mailText = null;
          this.mailContainer.scrollTop(0);
          console.log("mail sent: ", res);
          /**
           * TODO: Cleanup after the api is finalised
           */
          this.orderMailForm.reset();
          res.message_content = JSON.parse(res.message_content);
          this.mails.unshift(res);
          this._messageService.add({
            severity: "success",
            summary: "Sent",
            detail: "Mail Sent",
            life: 3000,
          });
        });
    } 
    else {
      this._mailService.sendMail(newMail).subscribe((res: Mail) => {
        this.mailText = null;
        this.mailContainer.scrollTop(0);
        console.log("mail sent: ", res);
        /**
         * TODO: Cleanup after the api is finalised
         */
        this.orderMailForm.reset();
        res.message_content = JSON.parse(res.message_content);
        this.mails.unshift(res);
        this._messageService.add({
          severity: "success",
          summary: "Sent",
          detail: "Mail Sent",
          life: 3000,
        });
      });
    }
  }

  toggleFormMakerDialog(): void {
    this.showFormMakerDialog = !this.showFormMakerDialog;
  }

  toggleSavedFormsDialog(): void {
    this.savedFormsDialog = !this.savedFormsDialog;
  }

  toggleSavedFormPreview(): void {
    this.savedFormPreview = !this.savedFormPreview;
  }

  previewForm(): void {
    console.log('preview form');
    this.toggleSavedFormsDialog();
    this.toggleSavedFormPreview();
  }

  setMailForm(): void {
    console.log('setting form ', this.selectedSavedForm);
    this.orderMailForm.setValue(this.selectedSavedForm.data);
    this.toggleSavedFormsDialog();
    console.log(this.orderMailForm.value);
    this.orderMailForm.markAllAsTouched();
    this.selectedSavedForm = null;
  }
}

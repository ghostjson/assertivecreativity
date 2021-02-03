import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Mail } from 'src/app/models/Mail';
import { MailService } from 'src/app/services/mail.service';
import { MessageService } from 'primeng/api';
import { ScrollPanel } from 'primeng/scrollpanel';
import { Order } from 'src/app/models/Order';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { User } from 'src/app/models/User';
import { OrderFormConfig, OrderFormResponse } from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';
import { FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-order-mail-list',
  templateUrl: './order-mail-list.component.html',
  styleUrls: ['./order-mail-list.component.scss'],
  providers: [MessageService],
})
export class OrderMailListComponent implements OnInit {
  @ViewChild('mailContainer') mailContainer: ScrollPanel;

  @Input() mails: Mail[];
  @Input() order: Order;
  @Input() receiverId: number;

  mailText: string;
  adminMode: boolean;
  user: User;
  orderMailForm: FormGroup;
  showFormMakerDialog: boolean;
  savedForms: OrderFormResponse[];
  savedFormsDialog: boolean;
  selectedSavedForm: OrderFormResponse;
  savedFormPreview: boolean;
  activeForm: {
    config: OrderFormConfig;
    isReceiver: boolean;
    visible: boolean;
  };

  constructor(
    private _mailService: MailService,
    private _messageService: MessageService,
    private _userDetailsService: UserDetailsService,
    private _formMakerService: AdminOrdersFormMakerService,
    private _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.user = this._userDetailsService.getUserLocal();

    /**
     * TODO: Fix after api is finailzed for mail forms
     */
    // if(this.user.role === 'admin') {
    // }
    if (this.user.role === 'admin') {
      this._commonService.setLoaderFor(
        this._formMakerService
          .getAllForms()
          .subscribe((res: OrderFormResponse[]) => {
            this.savedForms = res;
          })
      );
    }

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
    const messageContent = {
      message: this.mailText,
      forms: [],
    };

    if (this.orderMailForm) {
      messageContent.forms.push(this.orderMailForm.value);
    }

    const newMail: Mail = {
      order_id: Number(this.order.id),
      message_content: JSON.stringify(messageContent),
    };

    if (this.user.role === 'admin') {
      this._mailService
        .sendMailToUser(newMail, Number(this.receiverId))
        .subscribe((res: Mail) => {
          this.mailText = null;
          this.mailContainer.scrollTop(0);
          /**
           * TODO: Cleanup after the api is finalised
           */
          this.orderMailForm = this._formMakerService.createOrderForm();
          res.message_content = JSON.parse(res.message_content);
          this.mails.unshift(res);
          this._messageService.add({
            severity: 'success',
            summary: 'Sent',
            detail: 'Mail Sent',
            life: 3000,
          });
        });
    } else {
      this._mailService.sendMail(newMail).subscribe((res: Mail) => {
        this.mailText = null;
        this.mailContainer.scrollTop(0);
        /**
         * TODO: Cleanup after the api is finalised
         */
        this.orderMailForm = this._formMakerService.createOrderForm();
        res.message_content = JSON.parse(res.message_content);
        this.mails.unshift(res);
        this._messageService.add({
          severity: 'success',
          summary: 'Sent',
          detail: 'Mail Sent',
          life: 3000,
        });
      });
    }
  }

  toggleFormMakerDialog(): void {
    this.showFormMakerDialog = !this.showFormMakerDialog;
  }

  createForm(): void {
    this.orderMailForm = this._formMakerService.createOrderForm();
    this.toggleFormMakerDialog();
  }

  toggleSavedFormsDialog(): void {
    this.savedFormsDialog = !this.savedFormsDialog;
  }

  toggleSavedFormPreview(): void {
    this.savedFormPreview = !this.savedFormPreview;
  }

  setMailForm(): void {
    console.log('setting order mail form: ', this.selectedSavedForm.data);
    this.orderMailForm = this._formMakerService.createOrderForm(
      this.selectedSavedForm.data
    );

    console.log('mail form created: ', this.orderMailForm.value);
    this.toggleSavedFormsDialog();
    this.selectedSavedForm = null;
  }

  deleteOrderMailForm(): void {
    this.orderMailForm = null;
  }

  toggleMessageForm(): void {
    this.activeForm.visible = !this.activeForm.visible;
  }

  previewForm(config: OrderFormConfig, isReceiver: boolean): void {
    this.activeForm = {
      config: config,
      isReceiver: isReceiver,
      visible: true,
    };
  }
}

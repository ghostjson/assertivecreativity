import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Mail } from 'src/app/models/Mail';
import { MailService } from 'src/app/services/mail.service';
import { MessageService } from 'primeng/api';
import { ScrollPanel } from 'primeng/scrollpanel';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-mail-list',
  templateUrl: './order-mail-list.component.html',
  styleUrls: ['./order-mail-list.component.scss'],
  providers: [MessageService]
})
export class OrderMailListComponent implements OnInit {
  @ViewChild('mailContainer') mailContainer: ScrollPanel;

  @Input() mails: Mail[];
  @Input() order: Order;
  @Input() styleClass: string;

  mailText: string;
  adminMode: boolean;

  constructor(
    private _mailService: MailService,
    private _messageService: MessageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    console.log('order received at mail list', this.order);
    if(this._router.url.includes('admin')) {
      console.info('author is admin');
      this.adminMode = true;
    }
    else {
      console.info('author is user');
      this.adminMode = false;
    }
  }

  /**
   * Send mail to an order thread
   */
  sendMail(): void {
    let time: Date | string = new Date();
    time = time.toISOString();

    let newMail: Mail = {
      order_id: Number(this.order.id),
      message_content: this.mailText
    };

    if(this.adminMode) {
      this._mailService.sendMailToUser(newMail, Number(this.order.buyer_id))
        .subscribe((res: Mail) => {
          this.mailText = null;
          this.mailContainer.scrollTop(0);
          console.log('mail sent: ', res);
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
        console.log('mail sent: ', res);
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
}

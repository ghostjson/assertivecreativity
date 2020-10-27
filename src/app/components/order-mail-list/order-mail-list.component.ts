import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Mail } from 'src/app/models/Mail';
import { MailService } from 'src/app/services/mail.service';
import { MessageService } from 'primeng/api';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'app-order-mail-list',
  templateUrl: './order-mail-list.component.html',
  styleUrls: ['./order-mail-list.component.scss'],
  providers: [MessageService]
})
export class OrderMailListComponent implements OnInit {
  @ViewChild('mailContainer') mailContainer: ScrollPanel;

  @Input() mails: Mail[];
  @Input() orderId: number;
  @Input() styleClass: string;

  mailText: string;

  constructor(
    private _mailService: MailService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  sendMail(): void {
    let time: Date | string = new Date();
    time = time.toISOString();

    let newMail: Mail = {
      order_id: this.orderId,
      message_content: this.mailText
    };

    this._mailService.sendMail(newMail).subscribe((res: Mail) => {
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

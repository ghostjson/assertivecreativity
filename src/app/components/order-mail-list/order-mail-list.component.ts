import { Component, OnInit, Input } from '@angular/core';
import { Mail } from 'src/app/models/Mail';
import { MailService } from 'src/app/services/mail.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-mail-list',
  templateUrl: './order-mail-list.component.html',
  styleUrls: ['./order-mail-list.component.scss'],
  providers: [MessageService]
})
export class OrderMailListComponent implements OnInit {
  @Input() mails: Mail[];
  @Input() mailThread: number;
  @Input() author: number;

  mailText: string;

  constructor(
    private _mailService: MailService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mailText = '';
  }

  sendMail(): void {
    let time: Date | string = new Date();
    time = time.toISOString();

    let newMail: Mail = {
      author: 0,
      receiver: 1,
      content: this.mailText,
      timestamp: time
    };
    newMail['mail-threadId'] = this.mailThread;

    console.info('mail to be send: ', newMail);
    this._mailService.sendMail(this.mailThread, newMail)
      .subscribe((mail: Mail) => {
        this.mails.push(mail);
        this.mailText = null;
        this._messageService.add({
          severity: 'success',
          summary: 'Email Sent'
        })
        console.log('mail send: ', mail);
      });
  }
}

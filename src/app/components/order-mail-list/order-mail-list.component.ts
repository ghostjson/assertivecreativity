import { Component, OnInit, Input } from '@angular/core';
import { Mail } from 'src/app/models/Mail';
import { MailService } from 'src/app/services/mail.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
  @Input() receiver: number;

  mailText: string;

  constructor(
    private _mailService: MailService,
    private _messageService: MessageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.mailText = '';
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

  sendMail(): void {
    let time: Date | string = new Date();
    time = time.toISOString();

    let newMail: Mail = {
      author: this.author,
      receiver: this.receiver,
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

import { Component, OnInit } from '@angular/core';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  mails: any;

  constructor(private mailService: MailService) { }

  async ngOnInit() {
    this.mails = this.mailService.getMails();
  }
}

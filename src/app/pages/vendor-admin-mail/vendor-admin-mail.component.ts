import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-vendor-admin-mail',
  templateUrl: './vendor-admin-mail.component.html',
  styleUrls: ['./vendor-admin-mail.component.scss']
})
export class VendorAdminMailComponent implements OnInit {

  mails: any;

  constructor(private mailService: MailService) { }

  async ngOnInit() {
    this.mails = this.mailService.getMails();
  }

}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { MailThread, Mail } from '../models/Mail';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class MailService {
  host: string;
  API_URL: string;

  constructor(private _http: HttpClient) {
    this.host = environment.apiUrl;
    this.API_URL = 'http://localhost:3000'
  }

  getMailsLink(): string {
    return `${this.API_URL}/messages`;
  }

  getMailsLinkById(id: number): string {
    return `${this.getMailsLink()}/${id}/mails`;
  }

  getMails(id: number): Observable<Mail[]> {
    console.log('request messages from: ', this.getMailsLinkById(id));
    return this._http
      .get<Mail[]>(this.getMailsLinkById(id))
      .pipe(take(1));
  }

  createMailThread(orderId: number): Observable<MailThread> {
    let newThread = {
      orderId: orderId
    };

    return this._http.post<MailThread>(this.getMailsLink(), newThread);
  }

  sendMail(id: number, mail: Mail): Observable<Mail> {
    return this._http.post<Mail>(this.getMailsLinkById(id), mail)
      .pipe(take(1));
  }
}

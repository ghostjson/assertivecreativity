import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Mail, MailResponse, MailThread, MailThreadResponse } from '../models/Mail';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class MailService {

  constructor(private _http: HttpClient) {
  }

  private mailLink(): string {
    return `${environment.apiUrl}/orders/threads`;
  }

  private mailLinkByUserId(userId: number): string {
    return `${this.mailLink()}/${userId}`;
  }

  private mailLinkByOrderId(orderId: number): string {
    return `${this.mailLink()}/order/${orderId}`;
  }

  getThreadByOrderId(orderId: number): Observable<MailThread> {
    return this._http.get<MailThreadResponse>(this.mailLinkByOrderId(orderId))
      .pipe(
        take(1),
        map((res: MailThreadResponse) => {
          return res.data;
        })
      );
  }

  getThreadByUserId(userId: number): Observable<MailThread> {
    return this._http.get<MailThreadResponse>(this.mailLinkByUserId(userId))
      .pipe(
        take(1),
        map((res: MailThreadResponse) => {
          return res.data;
        })
      );
  }

  sendMail(mail: Mail): Observable<Mail> {
    return this._http.post<MailResponse>(this.mailLink(), mail)
      .pipe(
        take(1),
        map((res: MailResponse) => {
          return res.data;
        })
      );
  }

  sendMailToUser(mail: Mail, userId: number): Observable<Mail> {
    return this._http.post<MailResponse>(this.mailLinkByUserId(userId), mail)
      .pipe(
        take(1),
        map((res: MailResponse) => {
          return res.data;
        })
      );
  }
}

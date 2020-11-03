import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import {
  AdminMailThreadResponse,
  Mail,
  MailResponse,
  MailThread,
  MailThreadResponse,
} from "../models/Mail";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MailService {
  constructor(private _http: HttpClient) {}

  /**
   * Return thread api url
   */
  private mailLink(): string {
    return `${environment.apiUrl}/orders/threads`;
  }

  private adminMailLink(): string {
    return `${this.mailLink()}/admin`;
  }

  /**
   * Return thread api link for a specific user
   * @param userId ID of the receiver
   */
  private mailLinkByUserId(userId: number): string {
    return `${this.mailLink()}/${userId}`;
  }

  /**
   * Return thread api link to send mail to a specific order
   * @param orderId ID of the order to send mail
   */
  private mailLinkByOrderId(orderId: number): string {
    return `${this.mailLink()}/order/${orderId}`;
  }

  private adminMailLinkByOrderId(orderId: number): string {
    return `${this.adminMailLink()}/order/${orderId}`;
  }

  /**
   * Get the mail thread of a particular order
   * @param orderId ID of the order
   */
  getThreadByOrderId(orderId: number): Observable<MailThread> {
    return this._http
      .get<MailThreadResponse>(this.mailLinkByOrderId(orderId))
      .pipe(
        take(1),
        map((res: MailThreadResponse) => {
          return res.data;
        })
      );
  }

  adminGetThreadByOrderId(orderId: number): Observable<AdminMailThreadResponse> {
    return this._http.get<AdminMailThreadResponse>(this.adminMailLinkByOrderId(orderId))
      .pipe(take(1));
  }

  /**
   * Get mail thread involving the requesting user and user with ID userId
   * @param threadId ID of the user
   */
  getThreadById(threadId: number): Observable<MailThread> {
    return this._http
      .get<MailThreadResponse>(this.mailLinkByUserId(threadId))
      .pipe(
        take(1),
        map((res: MailThreadResponse) => {
          return res.data;
        })
      );
  }

  /**
   * Send mail to a specific order's thread
   * @param mail mail object
   */
  sendMail(mail: Mail): Observable<Mail> {
    return this._http.post<MailResponse>(this.mailLink(), mail).pipe(
      take(1),
      map((res: MailResponse) => {
        return res.data;
      })
    );
  }

  /**
   * Send mail to a particular user
   * @param mail mail object
   * @param userId user ID of the receiving user
   */
  sendMailToUser(mail: Mail, userId: number): Observable<Mail> {
    return this._http
      .post<MailResponse>(this.mailLinkByUserId(userId), mail)
      .pipe(
        take(1),
        map((res: MailResponse) => {
          return res.data;
        })
      );
  }
}

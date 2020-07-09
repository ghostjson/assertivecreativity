import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { element } from "protractor";

@Injectable({
  providedIn: "root",
})
export class MailService {
  host: string;

  constructor(private http: HttpClient) {
    this.host = environment.apiUrl;
  }

  async getMails() {

    let res = await this.http.get(this.host + "/messages").toPromise();
    return this.sortMail(res);
  }

  sortMail(res) {
    let mes = {};
    res = res.data;

    let mesArr;

    console.log(res);

    res.forEach((c) => {
      if (!mes[c.order_id]) mes[c.order_id] = [c];
      else mes[c.order_id].push(c);
    });

    mesArr = Object.values(mes);

    mesArr.sort((a, b) =>
      new Date(a[0].created_at) < new Date(b[0].created_at) ? 1 : new Date(b[0].created_at) < new Date(a[0].created_at) ? -1 : 0
    );

    return mesArr;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order, OrderResponse } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {

  constructor(
    private _http: HttpClient
  ) {}
  
  /**
   * Return orders url
   */
  ordersUrl(): string {
    return `${environment.apiUrl}/orders`;
  }

  /**
   * Return admin orders url
   */
  adminOrdersUrl(): string {
    return `${this.ordersUrl()}/admin`;
  }

  /**
   * Return all orders placed
   */
  getAllOrders(): Observable<Order[]> {
    return this._http.get<OrderResponse>(this.adminOrdersUrl())
      .pipe(
        take(1),
        map((res: OrderResponse) => {
          return res.data as Order[];
        })
      );
  }
}

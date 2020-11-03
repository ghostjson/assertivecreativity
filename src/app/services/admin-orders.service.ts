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

  orderUrlById(id: number): string {
    return `${this.ordersUrl()}/${id}`
  }

  /**
   * Return admin orders url
   */
  adminOrdersUrl(): string {
    return `${this.ordersUrl()}/admin`;
  }

  /**
   * Return order API link for admin
   * @param id id of the order
   */
  private adminOrderUrlById(id: number): string {
    return `${this.adminOrdersUrl()}/${id}`;
  }

  /**
   * Return vendor orders url
   */
  vendorOrdersUrl(): string {
    return `${this.ordersUrl()}/vendor`
  }

  /**
   * Return order API link for admin
   * @param id id of the order
   */
  private vendorOrderUrlById(id: number): string {
    return `${this.vendorOrdersUrl()}/${id}`;
  }

  /**
   * Return all orders placed
   */
  getAllOrders(userRole: string): Observable<Order[]> {
    if(userRole === 'vendor') {
      return this._http.get<OrderResponse>(this.vendorOrdersUrl())
      .pipe(
        take(1),
        map((res: OrderResponse) => {
          return res.data as Order[];
        })
      );
    }
    else {
      return this._http.get<OrderResponse>(this.adminOrdersUrl())
      .pipe(
        take(1),
        map((res: OrderResponse) => {
          return res.data as Order[];
        })
      );
    }
  }

  /**
   * Return the order by id
   * @param id id of the order
   */
  getOrder(id: number, userRole: string): Observable<Order> {
    return this._http.get<Order>(this.orderUrlById(id))
      .pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductService } from './product.service';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _http: HttpClient
  ) {}

  /**
   * Return orders API link
   */
  private ordersLink(): string {
    return `${environment.apiUrl}/orders`;
  }

  /**
   * Return order API link
   * @param id id of the order
   */
  private orderLinkById(id: number): string {
    return `${this.ordersLink()}/${id}`;
  }

  /**
   * Return the order by id
   * @param id id of the order
   */
  getOrder(id: number): Observable<Order> {
    return this._http.get<Order>(this.orderLinkById(id));
  }

  /**
   * Return all orders
   */
  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this.ordersLink())
      .pipe(
        take(1),
        map((res: any) => {
          return res.data;
        })
      );
  }

  /**
   * Places the order on the server
   * @param order order object to place
   */
  placeOrder(order: Order): Observable<Order> {
    return this._http.post<Order>(this.ordersLink(), order);
  }

  addMailThread(threadId: number, order: Order): Observable<Order> {
    order.data.mail_thread = threadId;
  
    return this._http.put<Order>(this.orderLinkById(order.id), order);
  }

  /**
   * Create the order form group
   * @param product product object
   */
  newOrderForm(product: Product): FormGroup {
    let orderFormTemplate = {
      name: product.name,
      description: product.description,
      base_price: product.base_price,
      image: product.image,
      custom_forms: this._fb.array([])
    };

    product.custom_forms.forEach((customForm) => {
      this._productService.addForm(
        customForm, 
        orderFormTemplate.custom_forms
      );
    });

    return this._fb.group(orderFormTemplate);
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductService } from './product.service';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[];

  private API_URL: string;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _http: HttpClient
  ) {
    this.orders = [];

    // this.API_URL = 'http://localhost:3000';
    this.API_URL = 'http://3.129.34.125/mock-api';
  }

  /**
   * Return orders API link
   */
  private getOrdersLink(): string {
    return `${this.API_URL}/orders`;
  }

  /**
   * Return order API link
   * @param id id of the order
   */
  private getOrderLinkById(id: number): string {
    return `${this.getOrdersLink()}/${id}`;
  }

  /**
   * Return the order by id
   * @param id id of the order
   */
  getOrder(id: number): Observable<any> {
    return this._http.get(this.getOrderLinkById(id));
  }

  /**
   * Return all orders
   */
  getOrders(): Observable<any> {
    return this._http.get(this.getOrdersLink());
  }

  /**
   * Places the order on the server
   * @param order order object to place
   */
  placeOrder(order: Order): Observable<any> {
    return this._http.post(this.getOrdersLink(), order);
  }

  addMailThread(threadId: number, order: Order): Observable<Order> {
    order.mailThread = threadId;
  
    return this._http.put<Order>(this.getOrderLinkById(order.id), order);
  }

  /**
   * Create the order form group
   * @param product product object
   */
  newOrderForm(product: Product): FormGroup {
    let orderFormTemplate = {
      name: product.name,
      description: product.description,
      basePrice: product.base_price,
      image: product.image,
      customForms: this._fb.array([])
    };

    product.custom_forms.forEach((customForm) => {
      this._productService.addForm(
        customForm, 
        orderFormTemplate.customForms
      );
    });

    return this._fb.group(orderFormTemplate);
  }
}

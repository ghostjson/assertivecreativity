import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { ProductService } from "./product.service";
import { Order } from "../models/Order";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map, take } from "rxjs/operators";
import { IdGeneratorService } from "./id-generator.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _http: HttpClient,
    private _idGenService: IdGeneratorService
  ) {}

  /**
   * Return orders API link
   */
  private ordersLink(): string {
    return `${environment.apiUrl}/orders`;
  }

  /**
   * Stock orders link
   */
  private stockOrdersLink(): string {
    return `${this.ordersLink()}/stock`;
  }

  /**
   * Custom orders link
   */
  private customOrdersLink(): string {
    return `${this.ordersLink()}/custom`;
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
    return this._http.get<Order>(this.orderLinkById(id)).pipe(take(1));
  }

  /**
   * Return all orders
   */
  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this.ordersLink()).pipe(
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
  placeOrder(order: Order): Observable<any> {
    if(order.data.is_stock) {
      return this._http.post<Order>(this.stockOrdersLink(), order);
    }
    else {
      return this._http.post<Order>(this.customOrdersLink(), order);
    }
  }

  addMailThread(threadId: number, order: Order): Observable<Order> {
    order.data.mail_thread = threadId;

    return this._http.put<Order>(this.orderLinkById(order.id), order);
  }

  /**
   * Create an order FormGroup for a stock product
   * @param product Product object
   */
  createStockOrderForm(): FormGroup {
    return this._fb.group({
      stock_order_attributes: this._fb.array([
        this._fb.group({
          id: this._idGenService.getId(),
          attribute_label: "colors",
          attribute_type: "color",
          attribute_price: 0,
          input: null,
        }),
        this._fb.group({
          id: this._idGenService.getId(),
          attribute_label: "variant_id",
          attribute_type: "string",
          attribute_price: 0,
          input: null,
        })
      ]),
    });
  }

  /**
   * Create form for getting order related dates
   */
  createOrderDateForm(): FormGroup {
    return this._fb.group({
      delivery_dates: [
        null,
        [Validators.required]
      ],
      meeting_dates: [
        null,
        [Validators.required]
      ],
      confirmation_dates: [
        null,
        [Validators.required]
      ]
    });
  }
}

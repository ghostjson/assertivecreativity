import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
import { IdGeneratorService } from './id-generator.service';
import { CustomProduct, ProductAttribute } from '../models/Product';

@Injectable({
  providedIn: 'root',
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
    if (order.data.is_stock) {
      return this._http.post<Order>(this.stockOrdersLink(), order);
    } else {
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
          attribute_label: 'colors',
          attribute_type: 'color',
          attribute_price: 0,
          input: null,
        }),
        this._fb.group({
          id: this._idGenService.getId(),
          attribute_label: 'variant_id',
          attribute_type: 'string',
          attribute_price: 0,
          input: null,
        }),
      ]),
    });
  }

  /**
   * Create form for getting order related dates
   */
  createOrderDateForm(): FormGroup {
    return this._fb.group({
      delivery_dates: [null, [Validators.required]],
      meeting_dates: [null, [Validators.required]],
      confirmation_dates: [null, [Validators.required]],
    });
  }

  /**
   * create a formgroup for an custom order attribute
   * @param attr attribute config to create the form for
   * @returns formgroup for the attribute
   */
  createCustomOrderAttributeForm(attr: ProductAttribute): FormGroup {
    let attrTemplate = {
      id: [this._idGenService.getId()],
      config: { value: attr, disabled: true },
    };

    if (attr.is_attribute_group) {
      attrTemplate['input'] = [null, [Validators.required]];
      attrTemplate['child_attributes'] = this._fb.array(
        attr.child_attributes
          .map((childAttr) => {
            return childAttr.is_attribute_group
              ? this.createCustomOrderAttributeForm(childAttr)
              : null;
          })
          .filter((formGroup) => {
            return formGroup !== null;
          })
      );
    }

    return this._fb.group(attrTemplate);
  }

  /**
   * create formgroup for the custom order data
   * @param product product for which the order data form is created
   * @returns formgroup for the data of the order
   */
  createCustomOrderDataForm(product: CustomProduct): FormGroup {
    let orderDataTemplate = {
      is_stock: { value: false, disabled: true },
      quantity: [1, [Validators.required]],
      total_price: [0, [Validators.required]],
      mail_thread: [null, [Validators.required]],
      product_details: product.product,
      dates: this._fb.array([]),
      custom_order_attributes: this._fb.array(
        product.attributes.map((attr) => {
          return this.createCustomOrderAttributeForm(attr);
        })
      ),
    };

    return this._fb.group(orderDataTemplate);
  }

  /**
   * create a formgroup for a custom order
   * @param product product to create the order formgroup for
   * @returns formgroup for the order
   */
  createCustomOrderForm(product: CustomProduct): FormGroup {
    let orderTemplate = {
      product_id: { value: product.product.id, disabled: true },
      delivery_date: [null, [Validators.required]],
      data: this.createCustomOrderDataForm(product),
    };

    return this._fb.group(orderTemplate);
  }
}

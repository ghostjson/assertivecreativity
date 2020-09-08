import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  API_URL: string;
  CART_ID: number;
  cart: Order[];

  constructor(
    private _http: HttpClient
  ) {
    this.API_URL = 'http://localhost:3000';
    this.CART_ID = 0;

    // intialise the cart 
    this.refreshCart().subscribe((cart) => {
      this.cart = cart;
      console.log('cart refreshed: ', this.cart);
    });
  }

  /**
   * Return cart API link
   * @param id id of the cart object
   */
  getCartLinkById(id: number): string {
    return `${this.API_URL}/carts/${id}`;
  }

  /**
   * Return the ID of the user's cart
   */
  getCartId(): number {
    return this.CART_ID;
  }

  /**
   * Return the cart item 
   * @param id id of the cart item
   */
  getCartItem(id: number): Observable<any> {
    return this._http.get(`${this.getCartLinkById(this.CART_ID)}/items/${id}`)
      .pipe(take(1));
  }

  /**
   * Refresh the cart
   */
  refreshCart(): Observable<any> {
    return this._http.get(this.getCartLinkById(this.CART_ID))
      .pipe(take(1));
  }

  /**
   * Add an item to the user's cart
   * @param item item to add to cart
   */
  addToCart(item: Order): Observable<any> {
    return this._http.post(`${this.getCartLinkById(this.CART_ID)}/items`, item)
      .pipe(take(1));
  }

  /**
   * Delete an item from the cart
   * @param id id of the cart item
   */
  deleteFromCart(id: number): Observable<any> {
    return this._http.delete(`${this.getCartLinkById(this.CART_ID)}/items/${id}`)
      .pipe(take(1));
  }
}

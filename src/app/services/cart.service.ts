import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  API_URL: string;
  CART_ID: number;
  cart: Cart;

  constructor(
    private _http: HttpClient
  ) {
    // this.API_URL = 'http://localhost:3000';
    this.API_URL = 'http://3.129.34.125/mock-api';
    this.CART_ID = 0;

    // intialise the cart 
    // this.refreshCart();
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
   * Return all the items in the cart
   */
  getCart(): Observable<any> {
    return this._http.get(`${this.getCartLinkById(this.CART_ID)}/items`)
      .pipe(take(1));
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
  refreshCart(): void {
    this.getCart()
      .subscribe((cart: Cart) => {
        this.cart = cart;
        console.log('cart refreshed: ', this.cart);
      });
  }

  getCartSize(): number {
    return this.cart.items.length;
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

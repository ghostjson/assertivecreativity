import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Cart, CartItem } from '../models/Cart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;

  constructor(
    private _http: HttpClient
  ) {
    // intialise the cart 
    this.refreshCart();
  }

  /**
   * Return cart API link
   */
  private cartLink(): string {
    return `${environment.apiUrl}/orders/wishlist`;
  }

  /**
   * Return cart item link
   */
  private cartLinkById(id: number): string {
    return `${this.cartLink()}/${id}`;
  }

  /**
   * Return all the items in the cart
   */
  getCart(): Observable<Cart> {
    return this._http.get<Cart>(this.cartLink())
      .pipe(take(1));
  }

  /**
   * Return the cart item 
   */
  getCartItem(id: number): Observable<CartItem> {
    return this._http.get<CartItem>(this.cartLinkById(id))
      .pipe(map((item: any) => {
        return item.data;
      }));
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

  /**
   * Return size of the cart
   */
  getCartSize(): number {
    return this.cart.data.length;
  }

  /**
   * Add an item to the user's cart
   * @param item item to add to cart
   */
  addToCart(item: any): Observable<CartItem> {
    return this._http.post<CartItem>(`${this.cartLink()}`, item)
      .pipe(take(1));
  }

  /**
   * Delete an item from the cart
   * @param id id of the cart item
   */
  deleteFromCart(id: number): Observable<any> {
    return this._http.delete(`${this.cartLinkById(id)}`)
      .pipe(take(1));
  }
}

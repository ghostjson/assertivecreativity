import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { Cart, CartItem } from '../models/Cart';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) {
    // intialise the cart if user is logged in
    if(_authService.isAuthenticated()) {
      this.refreshCart();
    }
  }

  /**
   * Return cart API link
   */
  private cartLink(): string {
    return `${environment.apiUrl}/orders/wishlist`;
  }

  /**
   * Return custom cart link
   */
  private customCartLink(): string {
    return `${this.cartLink()}/custom`;
  }

  /**
   * Return stock cart link
   */
  private stockCartLink(): string {
    return `${this.cartLink()}/stock`;
  }

  /**
   * Return custom cart item link
   */
  private customCartItemLink(id: number): string {
    return `${this.customCartLink()}/${id}`;
  }

  /**
   * Return stock cart item link
   */
  private stockCartItemLink(id: number): string {
    return `${this.stockCartLink()}/${id}`;
  }

  /**
   * Return all the items in the custom cart
   */
  getCustomCart(): Observable<Cart> {
    return this._http.get<Cart>(this.customCartLink())
      .pipe(take(1));
  }

  /**
   * Return all the items in the stock cart
   */
  getStockCart(): Observable<Cart> {
    return this._http.get<Cart>(this.stockCartLink())
      .pipe(take(1));
  }

  /**
   * return both the carts combined
   */
  getCart(): Observable<Cart> {
    return this.getCustomCart().pipe(
      concatMap((customCart: Cart) => {
        return this.getStockCart().pipe(
          map((stockCart: Cart): Cart => {
            console.log('stock cart price: ', stockCart.total_price, ' custom cart: ', customCart.total_price);
            return {
              data: [...stockCart.data, ...customCart.data],
              total_price: stockCart.total_price + customCart.total_price
            };
          })
        );
      })
    );
  }

  /**
   * Return the custom cart item 
   */
  getCustomCartItem(id: number): Observable<CartItem> {
    return this._http.get<CartItem>(this.customCartItemLink(id))
      .pipe(map((item: any) => {
        return item.data;
      }));
  }

  /**
   * Return the stock cart item 
   */
  getStockCartItem(id: number): Observable<CartItem> {
    return this._http.get<CartItem>(this.stockCartItemLink(id))
      .pipe(map((item: any) => {
        return item.data;
      }));
  }

  getCartItem(id: number, is_stock: boolean) {
    return is_stock ? this.getStockCartItem(id) : this.getCustomCartItem(id);
  }

  /**
   * Refresh the cart
   */
  refreshCart(): void {
    // this.getCart()
    //   .subscribe((cart: Cart) => {
    //     this.cart = cart;
    //     console.log('cart refreshed: ', this.cart);
    //   });
  }

  /**
   * Return size of the cart
   */
  getCartSize(): number {
    return this.cart.data.length;
  }

  /**
   * Add a custom item to the user's cart
   * @param item item to add to cart
   */
  addToCustomCart(item: CartItem): Observable<CartItem> {
    return this._http.post<CartItem>(`${this.customCartLink()}`, item)
      .pipe(take(1));
  }

  /**
   * Add a custom item to the user's cart
   * @param item item to add to cart
   */
  addToStockCart(item: CartItem): Observable<CartItem> {
    return this._http.post<CartItem>(`${this.stockCartLink()}`, item)
      .pipe(take(1));
  }

  /**
   * Add to custom cart or stock cart
   * @param item cart item
   */
  addToCart(item: CartItem): Observable<CartItem> {
    return item.order_data.is_stock ? this.addToStockCart(item) : this.addToCustomCart(item);
  }

  /**
   * Delete an item from the custom cart
   * @param id id of the cart item
   */
  deleteCustomCartItem(id: number): Observable<any> {
    return this._http.delete(`${this.customCartItemLink(id)}`)
      .pipe(take(1));
  }

  /**
   * Delete an item from the stock cart
   * @param id id of the cart item
   */
  deleteStockCartItem(id: number): Observable<any> {
    return this._http.delete(`${this.stockCartItemLink(id)}`)
      .pipe(take(1));
  }

  /**
   * delete cart item
   * @param id id of the cart item
   * @param is_stock is stock item
   */
  deleteCartItem(id: number, is_stock: boolean): Observable<any> {
    return is_stock ? this.deleteStockCartItem(id) : this.deleteCustomCartItem(id);
  }

  /**
   * clear custom cart
   */
  clearCustomCart(): Observable<any> {
    return this._http.delete<any>(this.customCartLink())
      .pipe(take(1));
  }

  /**
   * clear stock product
   */
  clearStockCart(): Observable<any> {
    return this._http.delete<any>(this.stockCartLink())
      .pipe(take(1));
  }

  /**
   * clear the cart 
   * @param is_stock stock cart check
   */
  clearCart(): Observable<any> {
    return this.clearCustomCart().pipe(
      concatMap(() => {
        return this.clearStockCart();
      })
    );
  }
}

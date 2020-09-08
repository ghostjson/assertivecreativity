import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Order[];

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    this._cartService.getCart().subscribe((cart: Order[]) => {
      this.cart = cart;
    });
  }

  deleteItem(index: number): void {
    this._cartService.deleteFromCart(this.cart[index].id)
      .subscribe((res: any) => {
        console.log('item deleted', )
      });
    
    this.cart.splice(index, 1);
  }
}

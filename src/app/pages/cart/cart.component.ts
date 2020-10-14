import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Cart, CartItem } from "src/app/models/Cart";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/Product";
import { CustomFormInput } from 'src/app/models/Order';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(
    private _cartService: CartService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cart = {
      data: [],
    };

    this._cartService.getCart().subscribe((cart: Cart) => {
      this.cart = cart;
      console.info('Cart received: ', cart);
    });
  }

  /**
   * Delete an item from the cart
   * @param index index of the cart item
   */
  deleteItem(index: number): void {
    this._cartService
      .deleteFromCart(this.cart.data[index].id)
      .subscribe((res: any) => {
        this.cart.data.splice(index, 1);
        console.log("item deleted");
      });
  }
}

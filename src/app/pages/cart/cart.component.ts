import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Cart, CartItem } from "src/app/models/Cart";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/Product";
import { CustomFormInput } from "src/app/models/Order";
import { CommonService } from "src/app/common.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(
    private _cartService: CartService,
    private _commonService: CommonService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cart = null;
    
    this._cartService.getCart().subscribe((cart: Cart) => {
      this.cart = cart;
      console.info("Cart received: ", this.cart);
      this._commonService.setLoader(false);
    });
  }

  /**
   * Delete an item from the cart
   * @param index index of the cart item
   */
  deleteItem(index: number): void {
    let cartItem: CartItem = this.cart.data[index];

    this._cartService
      .deleteCartItem(cartItem.id, cartItem.order_data.is_stock)
      .subscribe(
        (res: any) => {
          this.cart.data.splice(index, 1);
          console.log("item deleted: ", res);

          this._messageService.add({
            severity: "success",
            summary: `${cartItem.product.name} deleted`,
            detail: `${cartItem.product.name} deleted from cart`,
          });
        },
        (e: any) => {
          console.error(e);

          this._messageService.add({
            severity: "error",
            summary: "Something went wrong",
            detail: `${cartItem.product.name} could not be deleted. Please try again`,
          });
        }
      );
  }

  clearCart(): void {
    this._cartService.clearCart().subscribe(
      (res: any) => {
        console.log(res);

        this._messageService.add({
          severity: "success",
          summary: "Cart Cleared",
          detail: "All orders removed from cart",
        });
      },
      (e: any) => {
        console.error(e);

        this._messageService.add({
          severity: "error",
          summary: "Something went wrong",
          detail: "Cart could not be cleared. Please try again",
        });
      }
    );
  }
}

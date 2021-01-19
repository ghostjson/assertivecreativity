import { Component, OnInit } from "@angular/core";
import {
  CustomFormInput,
  CustomFormsEntry,
  CustomOption,
  Order,
  OrderAttribute,
} from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { CartService } from "src/app/services/cart.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from "src/app/common.service";
import { CartItem } from "src/app/models/Cart";
import { UserDetailsService } from "src/app/store/user-details.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-cart-item-detail",
  templateUrl: "./cart-item-detail.component.html",
  styleUrls: ["./cart-item-detail.component.scss"],
})
export class CartItemDetailComponent implements OnInit {
  cartItemId: number;
  cartItem: CartItem;
  order: Order;
  is_stock: boolean;
  orderSummary: OrderAttribute[];

  minDate: Date;
  deliveryDates: FormGroup;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _commonService: CommonService,
    private _userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.cartItemId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this.is_stock = this._router.url.includes("stock");
    console.log("is stock: ", this.is_stock);

    this._cartService
      .getCartItem(this.cartItemId, this.is_stock)
      .subscribe((cartItem: CartItem) => {
        this.cartItem = cartItem;
        console.info("cart item received: ", cartItem);
      });

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.minDate = tomorrow;

    this.deliveryDates = this._orderService.createOrderDateForm();
  }

  /**
   * Confirm the order by pushing to the API
   */
  confirmOrder(): void {
    this._commonService.setLoader(true);
    this.order = {
      product_id: this.cartItem.product.id,
      delivery_date: {
        delivery_dates: this.deliveryDates.value.delivery_dates.map(
          (date: Date) => {
            return date ? date.toISOString() : '';
          }
        ),
        meeting_dates: this.deliveryDates.value.meeting_dates.map(
          (date: Date) => {
            return date ? date.toISOString() : '';
          }
        ),
        confirmation_dates: this.deliveryDates.value.confirmation_dates.map(
          (date: Date) => {
            return date ? date.toISOString() : '';
          }
        ),
      },
      data: {
        is_stock: this.cartItem.order_data.is_stock,
        product_details: this.cartItem.product,
        custom_forms_entry: this.cartItem.order_data.is_stock
          ? null
          : this.cartItem.order_data.forms_input,
        stock_order_attributes: this.cartItem.order_data.is_stock
          ? this.cartItem.order_data.stock_order_attributes
          : null,
        total_price: this.cartItem.order_data.order_price,
        quantity: this.cartItem.quantity,
      }
    };

    // remove order from cart and add it to orders
    this._cartService
      .deleteCartItem(this.cartItemId, this.cartItem.order_data.is_stock)
      .subscribe(() => {
        console.log('item deleted from cart');
        console.log('placing order: ', this.order);
        this._orderService.placeOrder(this.order).subscribe((order: Order) => {
          console.log("order placed: ", order);
          this._router.navigate(["/orders/"]);
        });
      });
  }
}

import { Component, OnInit } from "@angular/core";
import {
  Order,
  OrderSummaryTable,
  CustomOption,
  CustomFormInput,
} from "src/app/models/Order";
import { TreeNode } from "primeng/api";
import { OrderService } from "src/app/services/order.service";
import { CartService } from "src/app/services/cart.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/app/common.service';
import { MailService } from 'src/app/services/mail.service';
import { MailThread } from 'src/app/models/Mail';
import { Cart, CartItem } from 'src/app/models/Cart';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { UserDetailsService } from 'src/app/store/user-details.service';

@Component({
  selector: "app-cart-item-detail",
  templateUrl: "./cart-item-detail.component.html",
  styleUrls: ["./cart-item-detail.component.scss"],
})
export class CartItemDetailComponent implements OnInit {
  cartItemId: number;
  cartItem: any;
  order: Order;

  minDate: Date;
  orderDeliveryDate: Date;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _commonService: CommonService,
    private _mailService: MailService,
    private _productService: ProductService,
    private _userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.cartItemId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    
    this._cartService.getCartItem(this.cartItemId)
      .subscribe((cartItem: CartItem) => {
        this.cartItem = cartItem;
        console.info('cart item received: ', cartItem);
      });
    
    let today = new Date()
    let tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
      
    this.minDate = tomorrow;
  }

  logDate(): void {
    console.log('date selected: ', this.orderDeliveryDate);
  }

  /**
   * Confirm the order by pushing to the API
   */
  confirmOrder(): void {
    this._commonService.setLoader(true);
    this.order = {
      product_id: this.cartItem.product.id,
      seller_id: this.cartItem.product.seller_id,
      buyer_id: this._userDetailsService.getUserLocal().id,
      order_status: 'open',
      delivery_date: this.orderDeliveryDate.toISOString(),
      data: {
        product_details: this.cartItem.product,
        custom_forms: this.cartItem.custom_forms_entry.forms_input,
        total_price: this.cartItem.custom_forms_entry.total_price, 
        quantity: 1
      }
    };

    // remove order from cart and add it to orders
    // this._cartService.deleteFromCart(this.cartItemId).subscribe((res: any) => {
      this._orderService.placeOrder(this.order).subscribe((order: Order) => {
        console.log("order placed: ", order);
        this._router.navigate(["/orders/"]);
        // this._mailService.createMailThread(order.id)
        //   .subscribe((thread: MailThread) => {
        //     console.log('mail thread created: ', thread);
        //     this._orderService.addMailThread(thread.id, order)
        //       .subscribe((editedOrder: Order) => {
        //         console.log('mail thread added to order: ', editedOrder);
        //         this._router.navigate(["/orders/", order.id]);
        //       });
        //   });
      });
    // });
  }
}

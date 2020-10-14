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
import { CartItem } from 'src/app/models/Cart';
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
  cartItem: CartItem;
  order: Order;

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
    
    // get the product detail of the cart item 
    this._productService.getProduct(this.cartItemId)
      .subscribe((product: Product) => {
        this.cartItem = this._cartService.getCartItem(this.cartItemId);
        this.cartItem.custom_forms = JSON.parse(String(this.cartItem.custom_forms_entry));
        this.cartItem.product_details = product;
      });
  }

  /**
   * Format date to the required format
   * @param {any} date Date object
   */
  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  }

  /**
   * Confirm the order by pushing to the API
   */
  confirmOrder(): void {
    this._commonService.setLoader(true);
    this.order = {
      product_id: this.cartItem.product_details.id,
      seller_id: this.cartItem.product_details.seller_id,
      buyer_id: this._userDetailsService.getUserLocal().id,
      order_status: 'open',
      delivery_date: this.orderDeliveryDate.toISOString(),
      order: {
        custom_forms: this.cartItem.custom_forms,
        total_price: this.cartItem.total_price, 
        quantity: 1
      }
    };

    // remove order from cart and add it to orders
    this._cartService.deleteFromCart(this.cartItemId).subscribe((res: any) => {
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
    });
  }
}

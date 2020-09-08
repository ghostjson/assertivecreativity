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

@Component({
  selector: "app-cart-item-detail",
  templateUrl: "./cart-item-detail.component.html",
  styleUrls: ["./cart-item-detail.component.scss"],
})
export class CartItemDetailComponent implements OnInit {
  order: Order;

  orderSummary: TreeNode[];

  formSummary: OrderSummaryTable[];
  orderDeliveryDate: Date;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._cartService
      .getCartItem(Number(this._activatedRoute.snapshot.paramMap.get("id")))
      .subscribe((item: Order) => {
        this.order = item;
        console.info("Order object: ", this.order);

        // add data needed for table component from the order details
        this.populateOrderTable();
      });
  }

  /**
   * Populate table row with the options chosen through the
   * custom form in the product page
   * @param option option object of the custom form
   */
  populateOption(option: CustomOption): TreeNode {
    let tableRow: TreeNode = {
      data: {
        title: option.title,
        input: option.input,
        price: option.price,
      },
    };

    return tableRow;
  }

  /**
   * Populate order table
   */
  populateOrderTable(): void {
    this.orderSummary = [];

    this.order.customForms.forEach((form: CustomFormInput) => {
      form.options.forEach((option) => {
        this.orderSummary.push(this.populateOption(option));

        // populate chained options
        option.chainedOptions.forEach((chainedOption) => {
          this.orderSummary.push(this.populateOption(chainedOption));
        });
      });
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
    this.order.orderDate = this.formatDate(new Date());
    this.order.status = "pending";
    this.order.deliveryDate = this.formatDate(this.orderDeliveryDate);

    // remove order from cart and add it to orders
    this._cartService.deleteFromCart(this.order.id).subscribe((order: any) => {
      // set the id to undefined since it gets set at the server
      this.order.id = undefined;
      // set cart id to undefined since its not needed anymore
      this.order.cartId = undefined;
      this._orderService.placeOrder(this.order).subscribe((order: Order) => {
        console.log("order placed: ", order);
        this._router.navigate(["/orders/"]);
      });
    });
  }
}

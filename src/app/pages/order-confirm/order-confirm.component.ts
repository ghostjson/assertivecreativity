import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { TreeNode } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderSummaryTable, CustomOption, CustomFormInput } from 'src/app/models/Order';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  order: any;

  orderSummary: TreeNode[];

  formSummary: OrderSummaryTable[];
  orderDeliveryDate: Date;

  constructor(
    private _orderService: OrderService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.order = this._orderService.getOrder(Number(this._activatedRoute.snapshot.paramMap.get('id')));
    console.info('Order object: ', this.order);
    this.orderSummary = [];

    // add data needed for table component from the order details
    this.populateOrderTable()
  }

  populateOption(option: CustomOption): TreeNode {
    let tableRow: TreeNode = {
      data: {
        title: option.title,
        input: option.input,
        price: option.price
      }
    };

    return tableRow;
  }

  // populate order table 
  populateOrderTable(): void {
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
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  confirmOrder(): void {
    this.order['deliveryDate'] = this.orderDeliveryDate;
    this.order['orderDate'] = this.formatDate(new Date());
    this.order['status'] = 'pending';
    this.order.deliveryDate = this.formatDate(this.order.deliveryDate);
    console.log(this.order);
    this._orderService.placeOrder(this.order);
    this._router.navigate(['/orders/']);
  }
}


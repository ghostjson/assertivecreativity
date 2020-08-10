import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { TreeNode } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  order: any;

  orderSummary: TreeNode[];
  orderDeliveryDate: Date;

  constructor(
    private _orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.order = this._orderService.getOrder();
    console.log('Order object: ', this.order);
    this.orderSummary = [];

    // add data needed for table component from the order details
    this.order.features.forEach((feature: any) => {
      let tableData: TreeNode = {
        data: {
          feature: feature.title,
          input: feature.input,
          price: feature.price
        },
        children: [],
        expanded: true
      };

      feature.chainedInputs.forEach((chainedInput: any) => {
        tableData.children.push({
          data: {
            feature: chainedInput.title,
            input: chainedInput.input,
            price: chainedInput.price
          }
        });
      });

      this.orderSummary.push(tableData);
      console.log(this.orderSummary);
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
    this.router.navigate(['/orders/']);
  }
}


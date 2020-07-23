import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { TreeNode } from 'primeng/api';

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
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.order = this._orderService.getOrder();
    console.log('Order object: ', this.order);
    this.orderSummary = [];

    // add data needed for table component from the order details
    this.order.features.forEach((feature) => {
      let tableData: TreeNode = {
        data: {
          feature: feature.title,
          input: feature.input,
          price: feature.price
        },
        children: [],
        expanded: true
      };

      feature.chainedInputs.forEach((chainedInput) => {
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
}


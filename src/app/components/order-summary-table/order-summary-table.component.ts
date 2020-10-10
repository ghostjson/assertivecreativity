import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrderSummaryTable, CustomOption, CustomFormInput, Order } from '../../models/Order';

@Component({
  selector: 'app-order-summary-table',
  templateUrl: './order-summary-table.component.html',
  styleUrls: ['./order-summary-table.component.scss']
})
export class OrderSummaryTableComponent implements OnInit {
  @Input() order: Order;

  orderSummary: TreeNode[];
  formSummary: OrderSummaryTable[];

  ngOnInit(): void {
    // add data needed for table component from the order details
    this.populateOrderTable();
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
        option.chained_options.forEach((chainedOption) => {
          this.orderSummary.push(this.populateOption(chainedOption));
        });
      });
    });
  }
}

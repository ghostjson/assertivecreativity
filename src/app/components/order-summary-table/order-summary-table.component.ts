import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrderSummaryTable, CustomOption, CustomFormsEntry, CustomFormInput } from '../../models/Order';

@Component({
  selector: 'app-order-summary-table',
  templateUrl: './order-summary-table.component.html',
  styleUrls: ['./order-summary-table.component.scss']
})
export class OrderSummaryTableComponent implements OnInit {
  @Input() customFormsEntry: CustomFormsEntry[];
  @Input() totalPrice: number;

  orderSummary: TreeNode[];
  formSummary: OrderSummaryTable[];

  ngOnInit(): void {
    console.info('cart item object in summary table: ', this.customFormsEntry);
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

    this.customFormsEntry.forEach((customFormsEntry: CustomFormsEntry) => {
      if(customFormsEntry.is_formgroup) {
        customFormsEntry.subforms.forEach((subform: CustomFormInput) => {
          subform.options.forEach((option: CustomOption) => {
            if(option.input) {
              this.orderSummary.push(this.populateOption(option));
            }

            // populate chained options
            option.chained_options.forEach((chainedOption: CustomOption) => {
              if(chainedOption.input) {
                this.orderSummary.push(this.populateOption(chainedOption));
              }
            });
          });
        });
      }
      else {
        customFormsEntry.options.forEach((option) => {
          if(option.input) {
            this.orderSummary.push(this.populateOption(option));
          }

          // populate chained options
          option.chained_options.forEach((chainedOption) => {
            if(chainedOption.input) {
              this.orderSummary.push(this.populateOption(chainedOption));
            }
          });
        });
      }
    });
  }
}

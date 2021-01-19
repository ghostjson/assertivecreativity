import { Component, Input, OnInit } from '@angular/core';
import { CustomFormInput, CustomFormsEntry, CustomOption, OrderAttribute } from '../../models/Order';

@Component({
  selector: 'app-order-summary-table',
  templateUrl: './order-summary-table.component.html',
  styleUrls: ['./order-summary-table.component.scss']
})
export class OrderSummaryTableComponent implements OnInit {
  @Input() totalPrice: number;
  @Input() quantity: number;
  @Input() is_stock: boolean;
  @Input() data: any;

  orderSummary: OrderAttribute[];

  ngOnInit(): void {
    if(this.is_stock) {
      this.orderSummary = this.data;
    }
    else {
      this.convertFormsToTable(this.data);
    }
  }

  /**
   * Populate table row with the options chosen through the
   * custom form in the product page
   * @param option option object of the custom form
   */
  createRow(option: CustomOption): OrderAttribute {
    let row: OrderAttribute = {
      attribute_label: option.title,
      attribute_price: option.price,
      input: option.input,
    };

    return row;
  }

  /**
   * Convert custom forms to table
   */
  convertFormsToTable(customFormsEntries: CustomFormsEntry[]): void {
    this.orderSummary = [];

    customFormsEntries.forEach((customFormsEntry: CustomFormsEntry) => {
      if (customFormsEntry.is_formgroup) {
        customFormsEntry.subforms.forEach((subform: CustomFormInput) => {
          subform.options.forEach((option: CustomOption) => {
            if (option.input) {
              this.orderSummary.push(this.createRow(option));
            }

            // populate chained options
            option.chained_options.forEach((chainedOption: CustomOption) => {
              if (chainedOption.input) {
                this.orderSummary.push(this.createRow(chainedOption));
              }
            });
          });
        });
      } else {
        customFormsEntry.options.forEach((option) => {
          if (option.input) {
            this.orderSummary.push(this.createRow(option));
          }

          // populate chained options
          option.chained_options.forEach((chainedOption) => {
            if (chainedOption.input) {
              this.orderSummary.push(this.createRow(chainedOption));
            }
          });
        });
      }
    });
  }
}

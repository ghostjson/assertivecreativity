import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CartCustomFormsEntry } from 'src/app/models/Cart';
import { OrderSummaryTable, CustomOption, CustomFormsEntry, CustomFormInput } from '../../models/Order';

@Component({
  selector: 'app-order-summary-table',
  templateUrl: './order-summary-table.component.html',
  styleUrls: ['./order-summary-table.component.scss']
})
export class OrderSummaryTableComponent implements OnInit {
  @Input() formsData: CartCustomFormsEntry;

  orderSummary: TreeNode[];
  formSummary: OrderSummaryTable[];

  ngOnInit(): void {
    console.info('cart item object in summary table: ', this.formsData);
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

    this.formsData.forms_input.custom_forms.forEach((formInput: CustomFormsEntry) => {
      if(formInput.is_formgroup) {
        formInput.subforms.forEach((subform: CustomFormInput) => {
          subform.options.forEach((option) => {
            this.orderSummary.push(this.populateOption(option));
    
            // populate chained options
            option.chained_options.forEach((chainedOption) => {
              this.orderSummary.push(this.populateOption(chainedOption));
            });
          });
        });
      }
      else {
        formInput.options.forEach((option) => {
          this.orderSummary.push(this.populateOption(option));
  
          // populate chained options
          option.chained_options.forEach((chainedOption) => {
            this.orderSummary.push(this.populateOption(chainedOption));
          });
        });
      }
    });

    // this.order.custom_forms.forEach((form: CustomFormInput) => {
    //   form.options.forEach((option) => {
    //     this.orderSummary.push(this.populateOption(option));

    //     // populate chained options
    //     option.chained_options.forEach((chainedOption) => {
    //       this.orderSummary.push(this.populateOption(chainedOption));
    //     });
    //   });
    // });
  }
}

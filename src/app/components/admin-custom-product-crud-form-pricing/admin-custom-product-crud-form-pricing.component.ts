import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-custom-product-crud-form-pricing',
  templateUrl: './admin-custom-product-crud-form-pricing.component.html',
  styleUrls: ['./admin-custom-product-crud-form-pricing.component.scss'],
})
export class AdminCustomProductCrudFormPricingComponent implements OnInit {
  @Input() styleClass: string;
  @Input() baseProductForm: FormGroup;

  pricingInfoMsgs: Message[];

  constructor(private _productService: AdminProductService) {}

  ngOnInit(): void {
    this.pricingInfoMsgs = [
      {
        severity: 'info',
        detail:
          'Price division is applied for quantities greater than which is specified',
      },
    ];
  }

  /**
   * get the pricing table formarray
   */
  pricingTableForm(): FormArray {
    return this.baseProductForm.get('price_table') as FormArray;
  }

  /**
   * return the minimum quantity that can be given in a row so that it is larger than the
   * previous row
   * @param currentRow index of the current row
   */
  minQuantityOfRow(currentRow: number): number {
    if (currentRow > 0) {
      return (
        (<FormArray>this.pricingTableForm()).at(currentRow - 1).value.quantity +
        1
      );
    }

    return 0;
  }

  /**
   * add pricing row to pricing table
   */
  addPriceRow(): void {
    // an initial value with quantity is passed so that the initial quantity
    // is larger than the previous quantity added
    this.pricingTableForm().push(
      this._productService.newPriceGroupForm({
        cost_per_piece: 0,
        price_per_piece: 0,
        quantity: this.minQuantityOfRow(this.pricingTableForm().length),
      })
    );
  }

  /**
   * remove the price at index
   * @param index index of the price row to remove
   */
  removePriceRow(index: number): void {
    this.pricingTableForm().removeAt(index);
  }
}

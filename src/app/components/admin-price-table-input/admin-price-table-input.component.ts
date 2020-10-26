import { Component, OnInit, Input } from "@angular/core";
import { SelectItem } from "primeng/api";
import { PriceGroup } from 'src/app/models/Product';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: "app-admin-price-table-input",
  templateUrl: "./admin-price-table-input.component.html",
  styleUrls: ["./admin-price-table-input.component.scss"],
})
export class AdminPriceTableInputComponent implements OnInit {
  @Input() formGroup: FormGroup;
  
  relations: SelectItem[];
  relationValueMap: any;

  constructor(
    private _fb: FormBuilder,
    private _productService: AdminProductService
  ) {}

  ngOnInit() {
    this.relations = [
      { label: 'Select a relation', value: null },
      { label: 'Less than or equal', value: 'lte' },
      { label: 'More than or equal', value: 'mte' }
    ];

    this.relationValueMap = {
      'lte': 'Less than or equal',
      'mte': 'More than or equal'
    };
  }

  /**
   * Tracking function for primeng editable table
   * @param index index of the row
   * @param row row data
   */
  trackByFn(index: number, row: PriceGroup): number {
    return index;
  }

  /**
   * get the pricing table form array
   */
  priceTable(): FormArray {
    return this.formGroup.get('price_table') as FormArray;
  }

  /**
   * Add price group to the pricing table
   */
  addPriceGroup(): void {
    console.info('price table: ', this.formGroup.value);
    this._productService.addPriceGroup(this.priceTable());
    console.log('new price group added');
  }
}

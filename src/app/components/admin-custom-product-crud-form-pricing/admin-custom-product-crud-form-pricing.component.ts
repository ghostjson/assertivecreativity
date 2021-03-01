import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form-pricing',
  templateUrl: './admin-custom-product-crud-form-pricing.component.html',
  styleUrls: ['./admin-custom-product-crud-form-pricing.component.scss'],
})
export class AdminCustomProductCrudFormPricingComponent implements OnInit {
  @Input() styleClass: string;
  @Input() baseProductForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  pricingTableForm(): FormArray {
    return this.baseProductForm.get('price_table') as FormArray;
  }
}

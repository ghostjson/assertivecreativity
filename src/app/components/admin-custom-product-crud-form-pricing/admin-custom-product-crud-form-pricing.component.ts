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

  pricingTableForm(): FormArray {
    return this.baseProductForm.get('price_table') as FormArray;
  }

  addPriceRow(): void {
    this.pricingTableForm().push(this._productService.newPriceGroupForm());
  }

  removePriceRow(index: number): void {
    this.pricingTableForm().removeAt(index);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-variant-crud-form-basic-details',
  templateUrl: './admin-product-variant-crud-form-basic-details.component.html',
  styleUrls: ['./admin-product-variant-crud-form-basic-details.component.scss'],
})
export class AdminProductVariantCrudFormBasicDetailsComponent {
  @Input() styleClass: string;
  @Input() variantForm: FormGroup;

  constructor() {}

  /**
   * return thumbnail formgroup from variant form
   */
  thumbnail(): FormGroup {
    return <FormGroup>this.variantForm.get('thumbnail');
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-attr-crud-form-basic-details',
  templateUrl: './admin-product-attr-crud-form-basic-details.component.html',
  styleUrls: ['./admin-product-attr-crud-form-basic-details.component.scss'],
})
export class AdminProductAttrCrudFormBasicDetailsComponent {
  @Input() styleClass: string;
  @Input() attributeForm: FormGroup;

  constructor() {}

  /**
   * return thumbnail formgroup from attribute form
   */
  thumbnail(): FormGroup {
    return <FormGroup>this.attributeForm.get('thumbnail');
  }
}

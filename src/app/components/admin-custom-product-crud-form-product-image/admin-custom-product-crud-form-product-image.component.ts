import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form-product-image',
  templateUrl: './admin-custom-product-crud-form-product-image.component.html',
  styleUrls: ['./admin-custom-product-crud-form-product-image.component.scss'],
})
export class AdminCustomProductCrudFormProductImageComponent implements OnInit {
  @Input() imageForm: FormGroup;
  @Input() styleClass: string;

  constructor() {}

  ngOnInit(): void {}

  /**
   * get the front_view formgroup
   */
  frontView(): FormGroup {
    return this.imageForm.get('front_view') as FormGroup;
  }

  /**
   * get the back_view formgroup
   */
  backView(): FormGroup {
    return this.imageForm.get('back_view') as FormGroup;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form-order-properties',
  templateUrl:
    './admin-custom-product-crud-form-order-properties.component.html',
  styleUrls: [
    './admin-custom-product-crud-form-order-properties.component.scss',
  ],
})
export class AdminCustomProductCrudFormOrderPropertiesComponent
  implements OnInit {
  @Input() styleClass: string;
  @Input() orderPropsForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}

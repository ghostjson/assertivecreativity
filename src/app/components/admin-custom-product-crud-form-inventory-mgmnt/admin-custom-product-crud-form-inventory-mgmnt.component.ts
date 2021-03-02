import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form-inventory-mgmnt',
  templateUrl:
    './admin-custom-product-crud-form-inventory-mgmnt.component.html',
  styleUrls: [
    './admin-custom-product-crud-form-inventory-mgmnt.component.scss',
  ],
})
export class AdminCustomProductCrudFormInventoryMgmntComponent
  implements OnInit {
  @Input() styleClass: string;
  @Input() inventoryForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}

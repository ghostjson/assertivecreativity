import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form',
  templateUrl: './admin-custom-product-crud-form.component.html',
  styleUrls: ['./admin-custom-product-crud-form.component.scss'],
})
export class AdminCustomProductCrudFormComponent implements OnInit {
  @Input() productForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  baseProductForm(): FormGroup {
    return this.productForm.get('product') as FormGroup;
  }

  saveProduct(): void {
    console.log('product saved: ', this.productForm.value);
  }
}

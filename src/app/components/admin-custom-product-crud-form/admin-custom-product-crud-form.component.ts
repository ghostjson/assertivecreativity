import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form',
  templateUrl: './admin-custom-product-crud-form.component.html',
  styleUrls: ['./admin-custom-product-crud-form.component.scss'],
})
export class AdminCustomProductCrudFormComponent implements OnInit {
  @Input() productForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    console.log('image form: ', this.baseProductImageForm().value);
  }

  /**
   * get the base product formgroup
   */
  baseProductForm(): FormGroup {
    return this.productForm.get('product') as FormGroup;
  }

  /**
   * get the base product image form
   */
  baseProductImageForm(): FormGroup {
    return (<FormArray>this.productForm.get('product.images')).at(
      0
    ) as FormGroup;
  }

  /**
   * save the product
   */
  saveProduct(): void {
    console.log('product saved: ', this.productForm.value);
  }
}

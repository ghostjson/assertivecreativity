import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-custom-product-crud-form',
  templateUrl: './admin-custom-product-crud-form.component.html',
  styleUrls: ['./admin-custom-product-crud-form.component.scss'],
})
export class AdminCustomProductCrudFormComponent implements OnInit {
  @Input() productForm: FormGroup;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<FormGroup>();

  constructor(private _router: Router) {}

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
   * return order_props formgroup
   */
  orderPropsForm(): FormGroup {
    return this.productForm.get('product.order_props') as FormGroup;
  }

  /**
   * save the product
   */
  saveProduct(): void {
    console.log('product saved: ', this.productForm.value);
  }

  /**
   * emit cancel event
   */
  emitCancelEvent(): void {
    this.onCancel.emit();
  }

  /**
   * emit submit event
   */
  emitSubmitEvent(): void {
    this.onSubmit.emit(this.productForm);
  }

  /**
   * cancel the form
   */
  cancelForm(): void {
    this.emitCancelEvent();
    this._router.navigate(['/admin/products']);
  }
}

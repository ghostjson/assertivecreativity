import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { moveItemInFormArray } from 'src/app/library/FormsUtilities';
import { ProductAttribute } from 'src/app/models/Product';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-custom-product-crud-form-variants-tab',
  templateUrl: './admin-custom-product-crud-form-variants-tab.component.html',
  styleUrls: ['./admin-custom-product-crud-form-variants-tab.component.scss'],
})
export class AdminCustomProductCrudFormVariantsTabComponent {
  @Input() styleClass: string;
  @Input() productForm: FormGroup;

  activeAttrForm: FormGroup;
  activeAttrFormIndex: number;
  showAttrFormPanel: boolean;
  activeChildAttrForm: FormGroup;
  activeChildAttrFormIndex: number;
  showChildAttrFormPanel: boolean;

  constructor(private _productService: AdminProductService) {}

  /**
   * return attributes formarray
   */
  attributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  /**
   * add new attribute
   */
  addAttribute(): void {
    let newForm = this._productService.createProductAttrForm(false);
    this.attributes().push(newForm);

    // set the active form as newly created form
    this.activeAttrForm = newForm;
    this.activeAttrFormIndex = this.attributes().length - 1;
    this.showAttrCrudForm();
  }

  /**
   * edit an attribute
   * @param index index of the attribute to edit
   */
  editAttribute(index: number): void {
    this.activeAttrFormIndex = index;
    this.activeAttrForm = <FormGroup>this.attributes().at(index);
    this.showAttrCrudForm();
  }

  /**
   * remove the attribute
   * @param index index of the attribute to remove
   */
  removeAttribute(index: number): void {
    this.resetActiveAttr();
    this.hideAttrCrudForm();
    this.attributes().removeAt(index);
  }

  /**
   * show attribute crud form
   */
  showAttrCrudForm(): void {
    this.showAttrFormPanel = true;
  }

  /**
   * hide attribute crud form
   */
  hideAttrCrudForm(): void {
    this.showAttrFormPanel = false;
  }

  /**
   * clear the active attribute
   */
  resetActiveAttr(): void {
    this.activeAttrFormIndex = null;
    this.activeAttrForm = null;
  }

  /**
   * show child attribute crud form
   */
  showChildAttrCrudForm(): void {
    this.showChildAttrFormPanel = true;
  }

  /**
   * hide child attribute crud form
   */
  hideChildAttrCrudForm(): void {
    this.showChildAttrFormPanel = false;
  }

  /**
   * remove a child attribute
   */
  removeChildAttribute(): void {
    this.hideChildAttrCrudForm();
    (<FormArray>this.activeChildAttrForm.parent).removeAt(
      this.activeChildAttrFormIndex
    );
    this.resetActiveChildAttr();
  }

  /**
   * clear the active child attribute
   */
  resetActiveChildAttr(): void {
    this.activeChildAttrFormIndex = null;
    this.activeChildAttrForm = null;
  }

  /**
   * set the active child attribute form
   * @param event event object which is emitted from the attribute crud form
   */
  setChildAttrForm(event: any): void {
    this.activeChildAttrForm = event.formGroup;
    this.activeChildAttrFormIndex = event.index;
    this.showChildAttrCrudForm();
  }

  /**
   * handle drag sort of the attributes list
   * @param e event object
   */
  handleDragSort(e: CdkDragDrop<ProductAttribute[]>): void {
    moveItemInFormArray(this.attributes(), e.previousIndex, e.currentIndex);
  }
}

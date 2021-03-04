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

  resetActiveAttr(): void {
    this.activeAttrFormIndex = null;
    this.activeAttrForm = null;
  }

  /**
   * handle drag sort of the attributes list
   * @param e event object
   */
  handleDragSort(e: CdkDragDrop<ProductAttribute[]>): void {
    moveItemInFormArray(this.attributes(), e.previousIndex, e.currentIndex);
  }
}

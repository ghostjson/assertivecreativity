import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { moveItemInFormArray } from 'src/app/library/FormsUtilities';
import { ProductVariant } from 'src/app/models/Product';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-custom-product-crud-form-variants-tab',
  templateUrl: './admin-custom-product-crud-form-variants-tab.component.html',
  styleUrls: ['./admin-custom-product-crud-form-variants-tab.component.scss'],
})
export class AdminCustomProductCrudFormVariantsTabComponent {
  @Input() styleClass: string;
  @Input() productForm: FormGroup;

  activeVariantForm: FormGroup;
  activeVariantFormIndex: number;
  showVariantFormPanel: boolean;

  constructor(private _productService: AdminProductService) {}

  /**
   * return variants formarray
   */
  variants(): FormArray {
    return <FormArray>this.productForm.get('variants');
  }

  /**
   * add new variant
   */
  addVariant(): void {
    let newForm = this._productService.createProductVariantForm({
      variantId: Math.random() * 1000000,
      productId: Math.random() * 1000000,
    });
    this.variants().push(newForm);

    // set the active form as newly created form
    this.activeVariantForm = newForm;
    this.activeVariantFormIndex = this.variants().length - 1;
    this.showVariantCrudForm();
  }

  /**
   * edit an variant
   * @param index index of the variant to edit
   */
  editVariant(index: number): void {
    this.activeVariantFormIndex = index;
    this.activeVariantForm = <FormGroup>this.variants().at(index);
    this.showVariantCrudForm();
  }

  /**
   * remove the variant
   * @param index index of the variant to remove
   */
  removeVariant(index: number): void {
    this.resetActiveVariant();
    this.hideVariantCrudForm();
    this.variants().removeAt(index);
  }

  /**
   * show variant crud form
   */
  showVariantCrudForm(): void {
    this.showVariantFormPanel = true;
  }

  /**
   * hide variant crud form
   */
  hideVariantCrudForm(): void {
    this.showVariantFormPanel = false;
  }

  /**
   * clear the active variant
   */
  resetActiveVariant(): void {
    this.activeVariantFormIndex = null;
    this.activeVariantForm = null;
  }

  /**
   * handle drag sort of the variants list
   * @param e event object
   */
  handleDragSort(e: CdkDragDrop<ProductVariant[]>): void {
    moveItemInFormArray(this.variants(), e.previousIndex, e.currentIndex);
  }
}

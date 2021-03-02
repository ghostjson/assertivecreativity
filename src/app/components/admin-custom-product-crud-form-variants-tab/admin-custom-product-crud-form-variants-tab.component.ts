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
export class AdminCustomProductCrudFormVariantsTabComponent implements OnInit {
  @Input() styleClass: string;
  @Input() productForm: FormGroup;

  constructor(private _productService: AdminProductService) {}

  ngOnInit(): void {}

  attributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  addAttribute(): void {
    this.attributes().push(
      this._productService.createProductAttrForm('generic', false)
    );
  }

  removeAttribute(index: number): void {
    this.attributes().removeAt(index);
  }

  handleDragSort(e: CdkDragDrop<ProductAttribute[]>): void {
    moveItemInFormArray(this.attributes(), e.previousIndex, e.currentIndex);
  }
}

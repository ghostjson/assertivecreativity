import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { moveItemInFormArray } from 'src/app/library/FormsUtilities';
import { AdminProductService } from 'src/app/services/admin-product.service';
import { trackById } from 'src/app/library/TrackByFunctions';

@Component({
  selector: 'app-admin-product-attr-crud-form',
  templateUrl: './admin-product-attr-crud-form.component.html',
  styleUrls: ['./admin-product-attr-crud-form.component.scss'],
})
export class AdminProductAttrCrudFormComponent implements OnInit {
  @Input() styleClass: string;
  @Input() attributeForm: FormGroup;
  @Input() showAttrGroupSwitch: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onActiveChildAttr = new EventEmitter<{
    formGroup: FormGroup;
    index: number;
  }>();

  trackById = trackById;

  constructor(
    private _productService: AdminProductService,
    private _ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.attributeForm.value.is_attribute_group) {
      this._productService.setActiveProduct({
        activeAttrForm: this.attributeForm,
      });
    }
  }

  /**
   * return the child attributes form array
   */
  childAttrs(): FormArray {
    return <FormArray>this.attributeForm.get('child_attributes');
  }

  /**
   * add a new child attribute
   */
  addChildAttrs(): void {
    let newChildAttr = this._productService.createProductAttrForm(false);
    this.childAttrs().push(newChildAttr);
    this.emitActiveChildAttr(newChildAttr, this.childAttrs().length - 1);
  }

  /**
   * remove the child attribute at the index
   * @param index index of the child attribute to remove
   */
  removeChildAttr(index: number): void {
    this.childAttrs().removeAt(index);
  }

  /**
   * handle drag sort of the child attributes list
   * @param e event object
   */
  handleDragSort(e: CdkDragDrop<FormGroup[]>): void {
    moveItemInFormArray(this.childAttrs(), e.previousIndex, e.currentIndex);
  }

  /**
   * change values according to the nature of the attribute
   * @param event event object
   */
  handleAttrGroupSwitch(event: any): void {
    if (event.checked) {
      this.attributeForm.get('images').reset();
      this.attributeForm.patchValue({
        value: '',
        cost: 0,
        price: 0,
      });
    } else {
      this.childAttrs().clear();
    }
  }

  /**
   * emit the close event with the attribute index
   */
  emitCloseEvent(): void {
    this.onClose.emit();
    this._productService.setActiveProduct({
      activeAttrForm: null,
    });
  }

  /**
   * emit delete event
   */
  emitDeleteEvent(): void {
    this.onDelete.emit();
  }

  /**
   * emit the child attribute that was clicked
   * @param activeAttr currenlty active child attribute
   */
  emitActiveChildAttr(activeAttr: FormGroup, index: number): void {
    this.onActiveChildAttr.emit({
      formGroup: activeAttr,
      index: index,
    });
  }
}

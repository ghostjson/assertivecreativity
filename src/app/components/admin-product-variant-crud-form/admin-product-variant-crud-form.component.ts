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
  selector: 'app-admin-product-variant-crud-form',
  templateUrl: './admin-product-variant-crud-form.component.html',
  styleUrls: ['./admin-product-variant-crud-form.component.scss'],
})
export class AdminProductVariantCrudFormComponent implements OnInit {
  @Input() styleClass: string;
  @Input() variantForm: FormGroup;
  @Input() showVariantGroupSwitch: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  trackById = trackById;

  constructor(private _productService: AdminProductService) {}

  ngOnInit(): void {
    if (!this.variantForm.value.variant_group) {
      this._productService.setActiveProduct({
        activeVariantForm: this.variantForm,
      });
    }
  }

  /**
   * change values according to the nature of the variant
   * @param event event object
   */
  handleVariantGroupSwitch(event: any): void {
    if (event.checked) {
      this.variantForm.get('images').reset();
      this.variantForm.patchValue({
        value: '',
        base_cost: 0,
        base_price: 0,
      });
    }
  }

  /**
   * emit the close event with the variant index
   */
  emitCloseEvent(): void {
    this.onClose.emit();
    this._productService.setActiveProduct({
      activeVariantForm: null,
    });
  }

  /**
   * emit delete event
   */
  emitDeleteEvent(): void {
    this.onDelete.emit();
  }
}

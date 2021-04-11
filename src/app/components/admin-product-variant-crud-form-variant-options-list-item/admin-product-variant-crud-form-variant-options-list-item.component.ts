import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-variant-crud-form-variant-options-list-item',
  templateUrl:
    './admin-product-variant-crud-form-variant-options-list-item.component.html',
  styleUrls: [
    './admin-product-variant-crud-form-variant-options-list-item.component.scss',
  ],
})
export class AdminProductVariantCrudFormVariantOptionsListItemComponent
  implements OnInit {
  @Input() styleClass: string;
  @Input() variantForm: FormGroup;

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * emit variant delete event
   */
  emitDeleteEvent(): void {
    this.onDelete.emit();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-attr-crud-form-attr-options-list-item',
  templateUrl:
    './admin-product-attr-crud-form-attr-options-list-item.component.html',
  styleUrls: [
    './admin-product-attr-crud-form-attr-options-list-item.component.scss',
  ],
})
export class AdminProductAttrCrudFormAttrOptionsListItemComponent
  implements OnInit {
  @Input() styleClass: string;
  @Input() attributeForm: FormGroup;

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * emit attribute delete event
   */
  emitDeleteEvent(): void {
    this.onDelete.emit();
  }
}

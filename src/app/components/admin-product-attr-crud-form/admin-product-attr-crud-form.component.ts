import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-attr-crud-form',
  templateUrl: './admin-product-attr-crud-form.component.html',
  styleUrls: ['./admin-product-attr-crud-form.component.scss'],
})
export class AdminProductAttrCrudFormComponent implements OnInit {
  @Input() styleClass: string;
  @Input() attributeForm: FormGroup;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * emit the close event with the attribute index
   */
  emitCloseEvent(): void {
    this.onClose.emit();
  }

  /**
   * emit delete event
   */
  emitDeleteEvent(): void {
    this.onDelete.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VendorAdminProductService } from 'src/app/services/vendor-admin-product.service';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-admin-category-selector',
  templateUrl: './admin-category-selector.component.html',
  styleUrls: ['./admin-category-selector.component.scss']
})
export class AdminCategorySelectorComponent {
  @Input() formGroup: FormGroup;
  @Input() categories: Category[];

  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor () {}

  emitCategory(): void {
    this.onSelect.emit(this.formGroup.value.category);
  }
}

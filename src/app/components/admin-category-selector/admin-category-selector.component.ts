import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { VendorAdminProductService } from 'src/app/services/vendor-admin-product.service';

@Component({
  selector: 'app-admin-category-selector',
  templateUrl: './admin-category-selector.component.html',
  styleUrls: ['./admin-category-selector.component.scss']
})
export class AdminCategorySelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;

  categories: SelectItem[];

  constructor (
    private _productService: VendorAdminProductService
  ) {}

  ngOnInit() {
    this.categories = this._productService.getAllCategories();
  }
}

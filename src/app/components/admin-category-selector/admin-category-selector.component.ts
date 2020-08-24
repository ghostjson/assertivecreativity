import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VendorAdminProductService } from 'src/app/services/vendor-admin-product.service';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-admin-category-selector',
  templateUrl: './admin-category-selector.component.html',
  styleUrls: ['./admin-category-selector.component.scss']
})
export class AdminCategorySelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;

  categories: Category[];

  constructor (
    private _productService: VendorAdminProductService,
    private _prodCategorisation: ProductCategorisationService
  ) {}

  ngOnInit() {
    this.categories = this._prodCategorisation.getCategories();
    console.clear();
    console.info('categories: ', this.categories);
  }
}

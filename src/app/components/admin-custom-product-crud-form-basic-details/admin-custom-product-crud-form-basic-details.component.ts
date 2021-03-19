import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';

@Component({
  selector: 'app-admin-custom-product-crud-form-basic-details',
  templateUrl: './admin-custom-product-crud-form-basic-details.component.html',
  styleUrls: ['./admin-custom-product-crud-form-basic-details.component.scss'],
})
export class AdminCustomProductCrudFormBasicDetailsComponent implements OnInit {
  @Input() baseProductForm: FormGroup;

  categories: Category[];
  categoryField: FormControl;
  categoryIdField: FormControl;

  constructor(
    private _prodCategorisationService: ProductCategorisationService
  ) {}

  ngOnInit(): void {
    this._prodCategorisationService.getCustomCategories().subscribe((res) => {
      this.categories = res;
    });

    this.categoryIdField = <FormControl>this.baseProductForm.get('category_id');
    this.categoryField = <FormControl>this.baseProductForm.get('category');
  }

  setCategoryId(category: Category): void {
    this.categoryIdField.setValue((category && category.id) || null);
    console.log('form errors: ', this.baseProductForm.errors);
  }
}

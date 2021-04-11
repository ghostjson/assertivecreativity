import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-variant-crud-form-option-props',
  templateUrl: './admin-product-variant-crud-form-option-props.component.html',
  styleUrls: ['./admin-product-variant-crud-form-option-props.component.scss'],
})
export class AdminProductVariantCrudFormOptionPropsComponent implements OnInit {
  @Input() styleClass: string;
  @Input() variantForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  frontView(): FormGroup {
    return <FormGroup>(
      (<FormArray>this.variantForm.get('images')).at(0).get('front_view')
    );
  }

  backView(): FormGroup {
    return <FormGroup>(
      (<FormArray>this.variantForm.get('images')).at(0).get('back_view')
    );
  }
}

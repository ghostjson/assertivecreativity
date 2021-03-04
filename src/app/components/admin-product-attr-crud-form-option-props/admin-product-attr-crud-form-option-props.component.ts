import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-attr-crud-form-option-props',
  templateUrl: './admin-product-attr-crud-form-option-props.component.html',
  styleUrls: ['./admin-product-attr-crud-form-option-props.component.scss'],
})
export class AdminProductAttrCrudFormOptionPropsComponent implements OnInit {
  @Input() styleClass: string;
  @Input() attributeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  frontView(): FormGroup {
    return <FormGroup>(
      (<FormArray>this.attributeForm.get('images')).at(0).get('front_view')
    );
  }

  backView(): FormGroup {
    return <FormGroup>(
      (<FormArray>this.attributeForm.get('images')).at(0).get('back_view')
    );
  }
}

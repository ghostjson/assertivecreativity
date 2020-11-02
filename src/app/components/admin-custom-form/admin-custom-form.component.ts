import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { SelectItem } from 'primeng/api';

import { AdminProductService } from '../../services/admin-product.service';
@Component({
  selector: 'app-admin-custom-form',
  templateUrl: './admin-custom-form.component.html',
  styleUrls: ['./admin-custom-form.component.scss']
})
export class AdminCustomFormComponent implements OnInit {
  // @ViewChild('selectOptionOverlayTemplate') selectOptionOverlayTemplate: any;

  @Input() formArray: FormArray;
  @Input() formGroup: FormGroup;
  @Input() formCount: number;
  @Input() formId: number;

  customOptions: SelectItem[];
  selectedCustomOption: string;
  possibleOptions: Object;
  parentForms: SelectItem<number>[];

  constructor(
    private _productService: AdminProductService
  ) { }

  ngOnInit(): void {
    this.customOptions = this._productService.getCustomOptions();
    this.possibleOptions = this._productService.getOptionDefinitions();
    this.updateParentForms();
  }

  // initialise the form ids array for select parent input
  updateParentForms(): void{
    console.info('custom forms: ', this.formArray.value);
    this.parentForms = [];
    this.parentForms.push({
      label: 'None',
      value: null
    });

    for (let i = 0; i < this.formCount; ++i) {
      if ((i < this.formId) && (this.formArray.value[i].is_formgroup)) {
        this.parentForms.push({
          label: `Form ID ${i}`,
          value: i
        });
      }
    }
  }

  // helper function to get custom options in a custom form
  options(): FormArray {
    return this.formGroup.get('options') as FormArray;
  }

  // construct a form group for new option
  newOption(option: string): FormGroup {
    return this._productService.newOption(option);
  }

  // add option to the product
  addOption(optionType: string): void {
    this._productService.addOption(optionType, this.options());

    // Clear selected option stored
    setTimeout(() => {
      this.selectedCustomOption = null;
    }, 300);
  }

  // remove option from the custom form
  removeOption(optionId: number): void {
    console.log('remove option at ', optionId);

    this._productService.removeOption(optionId, this.options());
  }

  // remove custom form
  removeCustomForm(formId: number): void {
    this.formArray.removeAt(formId);
    console.log('removed custom form ', formId);

  }
}

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { SelectItem } from 'primeng/api';

import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
import { info } from 'console';
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

  constructor(
    private _productService: VendorAdminProductService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.customOptions = this._productService.getCustomOptions();
    this.possibleOptions = this._productService.getOptionDefinitions();
  }

  // initialise the form ids array for select parent input
  getFormIds(): SelectItem[] {
    let formIds = [];
    formIds.push({
      label: 'None',
      value: null
    });

    for (let i = 0; i < this.formCount; ++i) {
      if (i !== this.formId) {
        formIds.push({
          label: `Form ID ${i}`,
          value: i
        });
      }
    }

    return formIds;
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

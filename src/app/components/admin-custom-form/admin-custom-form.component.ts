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

  @Input() formGroup: FormGroup;
  @Input() formCount: number;
  @Input() formId: number;

  customOptions: SelectItem[];
  selectedCustomOption: Object;
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
    console.log("Creating ", option, " for the product!!");
    let optionTemplate: Object = {};
    let optionToAdd = this.possibleOptions[option];

    if (optionToAdd) {
      console.log(optionToAdd.type, " feature found :-)");
      optionTemplate = {
        type: [
          optionToAdd.type,
          [Validators.required]
        ],
        title: [
          null,
          [Validators.required]
        ],
        name: [
          optionToAdd.name,
          [Validators.required]
        ],
        inputs: this._fb.array([])
      }

      return this._fb.group(optionTemplate);
    }
    else {
      console.error("Selected feature not found!");
      return null;
    }
  }

  // add option to the product
  addOption(event: any): void {
    let newOption: FormGroup = this.newOption(event.value);

    if (newOption != null) {
      this.options().push(newOption);
      console.info(this.options());
    }
    else {
      console.error('option could not be created!!');
    }
  }

  // remove option from the custom form
  removeOption(optionId: number): void {
    console.log("Product feature: ", this.options().at(optionId));
    this.options().removeAt(optionId);
  }

  // helper function to get a list of all the inputs of an option
  optionInputs(optionId: number): FormArray {
    return this.options().at(optionId).get('inputs') as FormArray;
  }
}

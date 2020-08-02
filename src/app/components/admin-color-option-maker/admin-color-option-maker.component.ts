import { Component, OnInit, Input } from '@angular/core';

import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
import { FormGroup, FormArray } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-color-option-maker',
  templateUrl: './admin-color-option-maker.component.html',
  styleUrls: ['./admin-color-option-maker.component.scss']
})
export class AdminColorOptionMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() optionInd: number;

  color: string[] = ['#AC7B19'];
  chainedOptions: SelectItem[];
  selectedChainedOption: Object;

  constructor(
    public _productService: VendorAdminProductService
  ) { }

  ngOnInit(): void {
    this.chainedOptions = this._productService.getCustomOptions();
  }

  /**
   * Get inputs of the option
   */
  getInputs(): FormArray {
    return this.formGroup.get('inputs') as FormArray;
  }

  /**
   * Get the chained options of an input
   * @param inputId Index of the chained option
   */
  getChainedOptions(inputId: number): FormArray {
    let inputs = this.getInputs().at(inputId).get('chainedOptions') as FormArray;

    return inputs;
  }

  addOption(options: FormArray, optionType: string): void {
    this._productService.addOption(options, optionType);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }

  addOptionInput(inputs: FormArray, inputType: string) {
    let isChained = false;

    // check if the current input is a chained input
    if (this.formGroup.get('chainedOptions')) {
      isChained = false;
    }

    // add the input to the option
    this._productService.addOptionInput(inputs, inputType, isChained);
  }

  addChainedOption(options: FormArray, optionType: string): void {
    this._productService.addOption(options, optionType);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }
}

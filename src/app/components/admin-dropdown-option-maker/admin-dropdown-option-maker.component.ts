import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AdminProductService } from 'src/app/services/admin-product.service';
import { info } from 'console';

@Component({
  selector: 'app-admin-dropdown-option-maker',
  templateUrl: './admin-dropdown-option-maker.component.html',
  styleUrls: ['./admin-dropdown-option-maker.component.scss']
})
export class AdminDropdownOptionMakerComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() formGroup: FormGroup;
  @Input() optionInd: number;

  chainedOptions: SelectItem[];
  selectedChainedOption: Object;
  dialogVisible: boolean[] = [];

  constructor(
    public _productService: AdminProductService
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
   * @param inputId Index of the parent input
   */
  getChainedOptions(inputId: number): FormArray {
    let chainedOptions = this.getInputs().at(inputId).get('chainedOptions') as FormArray;
    // console.info('chained Options: ', chainedOptions);
    return chainedOptions;
  }

  addOption(optionType: string, options: FormArray): void {
    this._productService.addOption(optionType, options);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }

  addOptionInput(inputType: string, inputs: FormArray) {
    // add the input to the option
    this._productService.addOptionInput(inputType, inputs, this.formGroup);
  }

  addChainedOption(optionType: string, options: FormArray): void {
    this._productService.addOption(optionType, options, true);

    // add to dialog controls and make it true to display it
    this.dialogVisible.push(true);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }

  showDialog(index: number): void {
    this.dialogVisible[index] = true;
  }

  slugify(str: any)  {
    str += '';

    return str.trim().toLowerCase().replace(/\s+/g, '-');
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { AdminProductService } from '../../services/admin-product.service';
import { FormGroup, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-color-option-maker',
  templateUrl: './admin-color-option-maker.component.html',
  styleUrls: ['./admin-color-option-maker.component.scss']
})
export class AdminColorOptionMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formArray: FormArray;
  @Input() optionInd: number;

  color: string[] = ['#AC7B19'];
  chainedOptions: SelectItem[];
  selectedChainedOption: Object;
  dialogVisible: boolean[][] = [[]];

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
    let chainedOptions = this.getInputs().at(inputId).get('chained_options') as FormArray;
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

  addChainedOption(optionType: string, options: FormArray, inputInd: number): void {
    this._productService.addOption(optionType, options, true);

    // add to dialog controls and make it true to display it
    if(this.dialogVisible[inputInd]) {
      this.dialogVisible[inputInd].push(true);
    }
    else {
      this.dialogVisible.push([]);
      this.dialogVisible[inputInd].push(true);
    }
    console.log('dialog visibility statuses: ', this.dialogVisible);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }

  test(input: any) {
    console.log('test function output: ', input)
  }

  toggleDialog(inputInd: number, chainedInd: number): void {
    this.dialogVisible[inputInd][chainedInd] = !this.dialogVisible[inputInd][chainedInd];
  }
}

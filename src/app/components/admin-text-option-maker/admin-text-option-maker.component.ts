import { Component, OnInit, Input } from '@angular/core';
import { AdminProductService } from '../../services/admin-product.service';
import { FormGroup, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-text-option-maker',
  templateUrl: './admin-text-option-maker.component.html',
  styleUrls: ['./admin-text-option-maker.component.scss']
})
export class AdminTextOptionMakerComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() formGroup: FormGroup;
  @Input() optionInd: number;

  chainedOptions: SelectItem[];
  selectedChainedOption: Object;
  dialogVisible: boolean[][] = [];

  constructor(
    public _productService: AdminProductService
  ) { }

  ngOnInit(): void {
    this.chainedOptions = this._productService.getCustomOptions();
    this.addOptionInput(this.formGroup.value.type, this.formGroup.get('inputs') as FormArray);
    // initialise the dialog controls if it is editing products 
    if(this.formGroup.value.inputs.length > 0) {
      this.initialiseDialogControls();
    }
  }

  /**
   * initialise the dialogVisible array 
   */
  initialiseDialogControls(): void {
    for(let i = 0; i < this.formGroup.value.inputs.length; ++i) {
      this.dialogVisible.push([]);

      if(!this.formGroup.value.meta.isChained) {
        for(let j = 0; j < this.formGroup.value.inputs[i].chained_options.length; ++j) {
          this.dialogVisible[i].push(false);
        }
      }
    }
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

  /**
   * Add an option to options form array
   * @param optionType type of the option
   * @param options option form array to add the option
   */
  addOption(optionType: string, options: FormArray): void {
    this._productService.addOption(optionType, options);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }

  /**
   * Add an input to an inputs form array
   * @param inputType type of the input
   * @param inputs inputs form array to add
   */
  addOptionInput(inputType: string, inputs: FormArray) {
    // add the input to the option
    this._productService.addOptionInput(inputType, inputs, this.formGroup);
  }

  /**
   * Add chained option to a parent input
   * @param optionType type of the option
   * @param options options form array to add to
   * @param inputInd index of the parent input
   */
  addChainedOption(optionType: string, options: FormArray, inputInd: number = 0): void {
    this._productService.addOption(optionType, options, true);

    // add to dialog controls and make it true to display it
    if(!this.dialogVisible[inputInd]) {
      this.dialogVisible.push([]);
    }
    
    this.dialogVisible[inputInd].push(true);

    // Clear selected option stored
    setTimeout(() => {
      optionType = null;
    }, 300);
  }

  /**
   * Toggle dialog box for adding/creating the chained option
   * @param inputInd index of the input
   * @param chainedInd index of the chained option
   */
  toggleDialog(inputInd: number, chainedInd: number): void {
    this.dialogVisible[inputInd][chainedInd] = !this.dialogVisible[inputInd][chainedInd];
  }
}

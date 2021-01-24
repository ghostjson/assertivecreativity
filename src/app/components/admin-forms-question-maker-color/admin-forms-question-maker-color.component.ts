import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Color } from 'src/app/models/Color';
import { FormInput } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-admin-forms-question-maker-color',
  templateUrl: './admin-forms-question-maker-color.component.html',
  styleUrls: ['./admin-forms-question-maker-color.component.scss']
})
export class AdminFormsQuestionMakerColorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() pantoneColors: Color[];

  colorSelector: boolean;
  selectedColor: string;
  currentColorInput: FormInput;
  currentInputIndex: number;
  colorEditMode: boolean;

  constructor(
    private _formMakerService: AdminOrdersFormMakerService,
    private _idGenService: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.currentColorInput = {
      id: this._idGenService.getId(),
      label: 'Assertive',
      value: '#cc9933'
    };
    this.colorSelector = false;
    this.colorEditMode = false;
    this.inputs.removeAt(0);
  }

  /**
   * Get inputs formarray of the question
   */
  public get inputs(): FormArray {
    return this.form.get('inputs') as FormArray;
  }

  /**
   * Save the question input, add if does not exist
   */
  saveQuestionInput(): void {
    console.log('addning ', this.currentColorInput);
    if(this.colorEditMode) {
      this.currentColorInput.id = this.currentInputIndex;
      this.inputs.at(this.currentInputIndex).patchValue(this.currentColorInput);
      this.colorEditMode = false;
    }
    else {
      this.inputs.push(this._formMakerService.createQuestionInput(this.currentColorInput));
    }

    this.toggleColorSelector()
  }

  /**
   * Edit question input at inputIndex
   * @param inputIndex index of the input
   * @param currentValue currentValue of the input
   */
  editQuestionInput(inputIndex: number, currentValue: FormInput) {
    this.colorEditMode = true;
    this.currentColorInput = currentValue;
    this.currentInputIndex = inputIndex;
    this.toggleColorSelector();
  }

  /**
   * remove the input at inputIndex
   * @param inputIndex index of the input
   */
  removeQuestionInput(inputIndex: number): void {
    this.inputs.removeAt(inputIndex);
  }

  /**
   * toggle color selector dialog
   */
  toggleColorSelector(): void {
    console.info('current color: ', this.currentColorInput);
    this.colorSelector = !this.colorSelector;
  }
}

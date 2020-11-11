import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Color } from 'src/app/models/Color';
import { FormInput } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker-color',
  templateUrl: './order-mail-form-maker-color.component.html',
  styleUrls: ['./order-mail-form-maker-color.component.scss']
})
export class OrderMailFormMakerColorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() questionIndex: number;
  @Input() pantoneColors: Color[];

  colorSelector: boolean;
  selectedColor: string;
  currentColorInput: FormInput;
  currentInputIndex: number;
  colorEditMode: boolean;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    this.currentColorInput = {
      label: '',
      value: ''
    };
    this.colorSelector = false;
    this.colorEditMode = false;
    this.inputs().removeAt(0);
  }

  questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  inputs(): FormArray {
    return this.questions().at(this.questionIndex).get('inputs') as FormArray;
  }

  removeQuestion(): void {
    this.questions().removeAt(this.questionIndex);
  }

  saveQuestionInput(): void {
    console.log('addning ', this.currentColorInput);
    if(this.colorEditMode) {
      this.currentColorInput.id = this.currentInputIndex;
      this.inputs().at(this.currentInputIndex).patchValue(this.currentColorInput);
      this.colorEditMode = false;
    }
    else {
      this.inputs().push(this._formMakerService.createQuestionInput(this.currentColorInput));
    }

    this.toggleColorSelector()
  }

  editQuestionInput(inputIndex: number, currentValue: FormInput) {
    this.colorEditMode = true;
    this.currentColorInput = currentValue;
    this.currentInputIndex = inputIndex;
    this.toggleColorSelector();
  }

  removeQuestionInput(inputIndex: number): void {
    this.inputs().removeAt(inputIndex);
  }

  toggleColorSelector(): void {
    console.info('current color: ', this.currentColorInput);
    this.colorSelector = !this.colorSelector;
  }
}

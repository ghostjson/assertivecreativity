import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker-radio',
  templateUrl: './order-mail-form-maker-radio.component.html',
  styleUrls: ['./order-mail-form-maker-radio.component.scss']
})
export class OrderMailFormMakerRadioComponent {
  @Input() form: FormGroup;
  @Input() questionIndex: number;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  inputs(questionIndex: number): FormArray {
    return this.questions().at(questionIndex).get('inputs') as FormArray;
  }

  addQuestionInput(): void {
    this.inputs(this.questionIndex).push(this._formMakerService.createQuestionInput());
  }

  removeQuestionInput(inputIndex: number): void {
    this.inputs(this.questionIndex).removeAt(inputIndex);
  }
}

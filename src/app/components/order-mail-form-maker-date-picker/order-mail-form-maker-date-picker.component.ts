import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker-date-picker',
  templateUrl: './order-mail-form-maker-date-picker.component.html',
  styleUrls: ['./order-mail-form-maker-date-picker.component.scss']
})
export class OrderMailFormMakerDatePickerComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() questionIndex: number;
  minDate: Date;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow;
  }

  questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  inputs(questionIndex: number): FormArray {
    return this.questions().at(questionIndex).get('inputs') as FormArray;
  }

  removeQuestion(): void {
    this.questions().removeAt(this.questionIndex);
  }

  addQuestionInput(): void {
    this.inputs(this.questionIndex).push(this._formMakerService.createQuestionInput());
  }

  removeQuestionInput(inputIndex: number): void {
    this.inputs(this.questionIndex).removeAt(inputIndex);
  }
}

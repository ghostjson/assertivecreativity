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
  minDate: Date;
  maxDate: Date;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    this.minDate = new Date();
  }

  /**
   * get inputs formarray
   */
  public get inputs(): FormArray {
    return this.form.get('inputs') as FormArray;
  }

  /**
   * Add input to the question
   */
  addQuestionInput(): void {
    this.inputs.push(this._formMakerService.createQuestionInput());
  }

  /**
   * remove the input at index
   * @param inputIndex index of the input to remove
   */
  removeQuestionInput(inputIndex: number): void {
    this.inputs.removeAt(inputIndex);
  }
}

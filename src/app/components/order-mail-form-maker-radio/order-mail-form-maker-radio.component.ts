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

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  /**
   * Get inputs of the question
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
   * Remove the input at inputIndex
   * @param inputIndex index of the input to remove
   */
  removeQuestionInput(inputIndex: number): void {
    this.inputs.removeAt(inputIndex);
  }
}

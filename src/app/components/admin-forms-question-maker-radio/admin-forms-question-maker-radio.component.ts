import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-question-maker-radio',
  templateUrl: './admin-forms-question-maker-radio.component.html',
  styleUrls: ['./admin-forms-question-maker-radio.component.scss']
})
export class AdminFormsQuestionMakerRadioComponent {
  @Input() question: FormGroup;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  /**
   * Get inputs of the question
   */
  public get inputs(): FormArray {
    return this.question.get('inputs') as FormArray;
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

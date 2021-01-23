import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker-dropdown',
  templateUrl: './order-mail-form-maker-dropdown.component.html',
  styleUrls: ['./order-mail-form-maker-dropdown.component.scss']
})
export class OrderMailFormMakerDropdownComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
  }

  /**
   * Get the inputs formarray
   */
  public get inputs(): FormArray {
    return this.form.get('inputs') as FormArray;
  }

  /**
   * Add an input to the formgroup
   */
  addQuestionInput(): void {
    this.inputs.push(this._formMakerService.createQuestionInput());
  }

  /**
   * Remove input at index from the question
   * @param inputIndex index of the input to remove
   */
  removeQuestionInput(inputIndex: number): void {
    this.inputs.removeAt(inputIndex);
  }
}

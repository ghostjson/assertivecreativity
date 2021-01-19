import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Color } from 'src/app/models/Color';
import { OrderMailForm, OrderMailFormQuestion } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker',
  templateUrl: './order-mail-form-maker.component.html',
  styleUrls: ['./order-mail-form-maker.component.scss']
})
export class OrderMailFormMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  formGroupValue: OrderMailForm;
  questionTypes: SelectItem<string>[];
  pantoneColors: Color[];

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    console.log('formgroup received: ', this.formGroup.value);
    this.questionTypes = this._formMakerService.getQuestionTypes();
    this.pantoneColors = this._formMakerService.getPantoneColors();
  }

  questions(): FormArray {
    return this.formGroup.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions().push(this._formMakerService.createFormQuestion());
  }

  removeQuestion(index: number): void {
    this.questions().removeAt(index);
  }
}

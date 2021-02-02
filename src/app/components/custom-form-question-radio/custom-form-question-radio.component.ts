import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { OrderFormConfig, OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-radio',
  templateUrl: './custom-form-question-radio.component.html',
  styleUrls: ['./custom-form-question-radio.component.scss']
})
export class CustomFormQuestionRadioComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

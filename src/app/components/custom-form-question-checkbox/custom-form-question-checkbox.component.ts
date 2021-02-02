import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-checkbox',
  templateUrl: './custom-form-question-checkbox.component.html',
  styleUrls: ['./custom-form-question-checkbox.component.scss']
})
export class CustomFormQuestionCheckboxComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

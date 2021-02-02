import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Color } from 'src/app/models/Color';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-color',
  templateUrl: './custom-form-question-color.component.html',
  styleUrls: ['./custom-form-question-color.component.scss']
})
export class CustomFormQuestionColorComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

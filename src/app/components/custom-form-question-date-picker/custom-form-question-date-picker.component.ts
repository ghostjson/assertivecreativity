import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-date-picker',
  templateUrl: './custom-form-question-date-picker.component.html',
  styleUrls: ['./custom-form-question-date-picker.component.scss']
})
export class CustomFormQuestionDatePickerComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;

  today: Date;
  minDate: Date;
  maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.today = new Date();
    this.minDate = this.questionConfig.properties ? new Date(this.questionConfig.properties.minDate) : this.today;
    this.maxDate = this.questionConfig.properties ? new Date(this.questionConfig.properties.maxDate) : null;
  }

}

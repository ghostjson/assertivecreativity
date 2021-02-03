import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputEvent, OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-date-picker',
  templateUrl: './custom-form-question-date-picker.component.html',
  styleUrls: ['./custom-form-question-date-picker.component.scss'],
})
export class CustomFormQuestionDatePickerComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;
  @Input() questionIndex: number;
  @Output() onInput: EventEmitter<FormInputEvent> = new EventEmitter<FormInputEvent>();

  childrenQuestionConfigDict: { [key: string]: OrderFormQuestionConfig[] };

  today: Date;
  minDate: Date;
  maxDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.today = new Date();
    this.minDate = this.questionConfig.properties
      ? new Date(this.questionConfig.properties.minDate)
      : this.today;
    this.maxDate = this.questionConfig.properties
      ? new Date(this.questionConfig.properties.maxDate)
      : null;
  }

  /**
   * emit the children questions
   * @param e event object
   */
  emitChildren(e: { originalEvent: Event; value: any }): void {
    this.onInput.emit({
      questionFormGroup: this.questionFormGroup,
      questionConfig: this.questionConfig,
      questionIndex: this.questionIndex,
      childrenQuestionsConfig: this.questionConfig.inputs[0].children_form_questions,
      value: e.value,
      questionId: this.questionConfig.id,
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormInputEvent, OrderFormConfig, OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-radio',
  templateUrl: './custom-form-question-radio.component.html',
  styleUrls: ['./custom-form-question-radio.component.scss']
})
export class CustomFormQuestionRadioComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;
  @Input() questionIndex: number;
  @Output() onInput: EventEmitter<FormInputEvent> = new EventEmitter<FormInputEvent>();

  childrenQuestionConfigDict: { [key: string]: OrderFormQuestionConfig[] };
  constructor() { }

  ngOnInit(): void {
  // construct the children quesiton dictionary
  this.childrenQuestionConfigDict = {};
  this.questionConfig.inputs.forEach(input => {
    this.childrenQuestionConfigDict[input.label] = input.children_form_questions;
  });
}

/**
 * emit the children questions
 * @param e event object
 */
emitChildren(e: { originalEvent: Event, value: any}): void {
  this.onInput.emit({
    questionFormGroup: this.questionFormGroup,
    questionConfig: this.questionConfig,
    questionIndex: this.questionIndex,
    childrenQuestionsConfig: this.childrenQuestionConfigDict[e.value.value],
    value: e.value,
    questionId: this.questionConfig.id
  });
}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputEvent, OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-checkbox',
  templateUrl: './custom-form-question-checkbox.component.html',
  styleUrls: ['./custom-form-question-checkbox.component.scss']
})
export class CustomFormQuestionCheckboxComponent implements OnInit {
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

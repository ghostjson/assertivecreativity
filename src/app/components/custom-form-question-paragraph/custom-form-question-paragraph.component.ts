import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputEvent, OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-paragraph',
  templateUrl: './custom-form-question-paragraph.component.html',
  styleUrls: ['./custom-form-question-paragraph.component.scss'],
})
export class CustomFormQuestionParagraphComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;
  @Input() questionIndex: number;
  @Output() onInput: EventEmitter<FormInputEvent> = new EventEmitter<FormInputEvent>();

  constructor() {}

  ngOnInit(): void {

  }

  /**
   * emit the children questions
   * @param e event object
   */
  emitChildren(e: Event): void {
    this.onInput.emit({
      questionFormGroup: this.questionFormGroup,
      questionConfig: this.questionConfig,
      questionIndex: this.questionIndex,
      childrenQuestionsConfig: this.questionConfig.inputs[0].children_form_questions,
      value: e,
      questionId: this.questionConfig.id,
    });
  }
}

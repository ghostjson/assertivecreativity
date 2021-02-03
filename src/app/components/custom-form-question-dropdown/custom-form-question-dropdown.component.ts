import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  FormInputEvent,
  OrderFormQuestionConfig,
} from 'src/app/models/OrderForm';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-custom-form-question-dropdown',
  templateUrl: './custom-form-question-dropdown.component.html',
  styleUrls: ['./custom-form-question-dropdown.component.scss'],
})
export class CustomFormQuestionDropdownComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;
  @Input() questionIndex: number;
  @Output()
  onInput: EventEmitter<FormInputEvent> = new EventEmitter<FormInputEvent>();

  childrenQuestions: FormArray;
  childrenQuestionConfigDict: { [key: string]: OrderFormQuestionConfig[] };

  constructor(private _idGenService: IdGeneratorService) {}

  ngOnInit(): void {
    if (this.questionConfig.inputs[0].value !== null) {
      this.questionConfig.inputs.unshift({
        id: this._idGenService.getId(),
        label: 'Select an option',
        value: null,
      });
    }

    // construct the children quesiton dictionary
    this.childrenQuestionConfigDict = {};
    this.questionConfig.inputs.forEach((input) => {
      this.childrenQuestionConfigDict[input.label] =
        input.children_form_questions;
    });
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
      childrenQuestionsConfig: this.childrenQuestionConfigDict[e.value],
      value: e.value,
      questionId: this.questionConfig.id,
    });
  }
}

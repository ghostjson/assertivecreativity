import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormQuestionEvent } from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-question-maker-file',
  templateUrl: './admin-forms-question-maker-file.component.html',
  styleUrls: ['./admin-forms-question-maker-file.component.scss']
})
export class AdminFormsQuestionMakerFileComponent {
  @Input() question: FormGroup;
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>();

  currentChildQuestion: any;

  constructor(private _formMakerService: AdminOrdersFormMakerService) {}

  /**
   * Get inputs of the question
   */
  public get inputs(): FormArray {
    return this.question.get('inputs') as FormArray;
  }

  /**
   * get all the children inputs of an input
   * @param inputIndex index of the parent input of the child question
   */
  childrenQuestions(inputIndex: number): FormArray {
    return this.inputs.at(inputIndex).get('children_form_questions') as FormArray;
  }

  /**
   * Add child question to the input
   * @param inputIndex index of the input to which child question should be added
   */
  addChildrenQuestion(inputIndex: number): void {
    this.currentChildQuestion = this._formMakerService.createFormQuestion(true, {});
    this.childrenQuestions(inputIndex).push(this.currentChildQuestion);

    // emit that child question is active
    this.emitChildQuestion(
      this.currentChildQuestion,
      this.childrenQuestions(inputIndex),
      this.childrenQuestions.length - 1
    );
  }

  /**
   * emit the currently active child question to parent component
   * @param question child question currently active
   * @param parentArray parent form array of the question
   * @param questionIndex index of the child question in the form array
   */
  emitChildQuestion(question: FormGroup, parentArray: FormArray, questionIndex: number): void {
    this.currentChildQuestion = question;
    this.childQuestionActive.emit({
      question: question,
      parent: parentArray,
      questionIndex: questionIndex
    });
    console.log('emit from dropdown: ', this.currentChildQuestion);
  }
}

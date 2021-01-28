import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormQuestionEvent } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-admin-forms-question-maker-child-questions-list',
  templateUrl: './admin-forms-question-maker-child-questions-list.component.html',
  styleUrls: ['./admin-forms-question-maker-child-questions-list.component.scss']
})
export class AdminFormsQuestionMakerChildQuestionsListComponent {
  @Input() childrenQuestions: FormArray;
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>();
  currentChildQuestion: FormGroup;

  constructor(
  ) { }

  /**
   * remove the child question from the parent input
   * @param inputIndex index of the parent input
   * @param childIndex index of the child question
   */
  removeChildrenQuestion(childIndex: number): void {
    this.childrenQuestions.removeAt(childIndex);
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
    console.log('emit from child list: ', this.currentChildQuestion);
  }
}

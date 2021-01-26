import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormQuestionEvent } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-question-maker-dropdown',
  templateUrl: './admin-forms-question-maker-dropdown.html',
  styleUrls: ['./admin-forms-question-maker-dropdown.component.scss']
})

export class AdminFormsQuestionMakerDropdownComponent implements OnInit {
  @Input() question: FormGroup;
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>()
  
  currentChildQuestion: FormGroup;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
  }

  /**
   * Get the inputs formarray
   */
  public get inputs(): FormArray {
    return this.question.get('inputs') as FormArray;
  }

  /**
   * Add an input to the formgroup
   */
  addQuestionInput(): void {
    this.inputs.push(this._formMakerService.createQuestionInput());
  }

  /**
   * Remove input at index from the question
   * @param inputIndex index of the input to remove
   */
  removeQuestionInput(inputIndex: number): void {
    this.inputs.removeAt(inputIndex);
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
    this.currentChildQuestion = this._formMakerService.createFormQuestion(true);
    this.childrenQuestions(inputIndex).push(this.currentChildQuestion);

    // emit that child question is active
    this.emitChildQuestion(
      this.currentChildQuestion,
      this.childrenQuestions(inputIndex),
      this.childrenQuestions(inputIndex).length - 1
    );
    console.log('emit from dropdown: ', this.currentChildQuestion.value);
  }

  /**
   * remove the child question from the parent input
   * @param inputIndex index of the parent input
   * @param childIndex index of the child question
   */
  removeChildrenQuestion(inputIndex: number, childIndex: number): void {
    this.childrenQuestions(inputIndex).removeAt(childIndex);
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
  }
}

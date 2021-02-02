import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormQuestionEvent } from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-question-maker-date-picker',
  templateUrl: './admin-forms-question-maker-date-picker.component.html',
  styleUrls: ['./admin-forms-question-maker-date-picker.component.scss']
})
export class AdminFormsQuestionMakerDatePickerComponent implements OnInit {
  @Input() question: FormGroup;
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>();

  minDate: Date;
  maxDate: Date;
  currentChildQuestion: FormGroup;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    this.minDate = new Date();
    let properties = this.question.get('properties') as FormGroup;
    properties.addControl('minDate', new FormControl(this.minDate))
    properties.addControl('maxDate', new FormControl(''));
  }

  /**
   * get inputs formarray
   */
  public get inputs(): FormArray {
    return this.question.get('inputs') as FormArray;
  }

  /**
   * Add input to the question
   */
  addQuestionInput(): void {
    this.inputs.push(this._formMakerService.createQuestionInput());
  }

  /**
   * remove the input at index
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

  /**
   * Emit the child question active event to the parent component
   * @param e event
   */
  emitUp(e: any): void {
    console.log('emit from dropdown: ', e);
    this.childQuestionActive.emit({
      question: e.question,
      parent: e.parent,
      questionIndex: e.questionIndex
    });
  }
}

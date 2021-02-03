import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Color } from 'src/app/models/Color';
import { FormQuestionEvent, OrderFormInputConfig } from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-admin-forms-question-maker-color',
  templateUrl: './admin-forms-question-maker-color.component.html',
  styleUrls: ['./admin-forms-question-maker-color.component.scss']
})
export class AdminFormsQuestionMakerColorComponent implements OnInit {
  @Input() question: FormGroup;
  @Input() data: {
    pantoneColors: Color[]
  };
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>()

  colorSelector: boolean;
  currentColorInput: OrderFormInputConfig;
  currentInputIndex: number;
  colorEditMode: boolean;
  currentChildQuestion: FormGroup;

  constructor(
    private _formMakerService: AdminOrdersFormMakerService,
    private _idGenService: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.currentColorInput = {
      id: this._idGenService.getId(),
      label: 'Assertive',
      value: '#cc9933'
    };
    this.colorSelector = false;
    this.colorEditMode = false;

    // removing the first input as the service puts in a null input
    // and this breaks the component
    if(!this.inputs.at(0).value.value) {
      this.inputs.removeAt(0);
    }
  }

  /**
   * Get inputs formarray of the question
   */
  public get inputs(): FormArray {
    return this.question.get('inputs') as FormArray;
  }

  /**
   * Save the question input, add if does not exist
   */
  saveQuestionInput(): void {
    if(this.colorEditMode) {
      this.currentColorInput.id = this.currentInputIndex;
      this.inputs.at(this.currentInputIndex).patchValue(this.currentColorInput);
      this.colorEditMode = false;
    }
    else {
      let newColorInput = this._formMakerService.createQuestionInput();
      newColorInput.patchValue(this.currentColorInput);
      this.inputs.push(newColorInput);
    }

    console.log('inputs: ', this.question.value);

    this.toggleColorSelector()
  }

  /**
   * Edit question input at inputIndex
   * @param inputIndex index of the input
   * @param currentValue currentValue of the input
   */
  editQuestionInput(inputIndex: number, currentValue: OrderFormInputConfig) {
    this.colorEditMode = true;
    this.currentColorInput = currentValue;
    this.currentInputIndex = inputIndex;
    this.toggleColorSelector();
  }

  /**
   * remove the input at inputIndex
   * @param inputIndex index of the input
   */
  removeQuestionInput(inputIndex: number): void {
    this.inputs.removeAt(inputIndex);
  }

  /**
   * toggle color selector dialog
   */
  toggleColorSelector(): void {
    this.colorSelector = !this.colorSelector;
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
      this.childrenQuestions(inputIndex).length - 1
    );
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

  /**
   * Emit the child question active event to the parent component
   * @param e event
   */
  emitUp(e: any): void {
    this.childQuestionActive.emit({
      question: e.question,
      parent: e.parent,
      questionIndex: e.questionIndex
    });
  }
}

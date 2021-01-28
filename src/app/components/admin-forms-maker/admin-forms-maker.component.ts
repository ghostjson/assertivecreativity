import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormQuestionEvent, OrderFormQuestionConfig } from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-maker',
  templateUrl: './admin-forms-maker.component.html',
  styleUrls: ['./admin-forms-maker.component.scss']
})
export class AdminFormsMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild('formsPartContainer') formsPartContainer: ElementRef<HTMLElement>;

  activeChildQuestion: FormQuestionEvent;
  draggedQuestion: OrderFormQuestionConfig;
  dialogs: {
    childQuestion: boolean;
  };
  formsPartWidth: string;

  constructor(
    private _formMakerService: AdminOrdersFormMakerService
  ) {}

  ngOnInit(): void {
    this.dialogs = {
      childQuestion: false,
    };
  }

  /**
   * get questions formarray
   */
  questions(): FormArray {
    return this.formGroup.get('questions') as FormArray;
  }

  /**
   * Add a question
   * @param question question object to add to the formarray
   */
  addQuestion(question: OrderFormQuestionConfig = null): void {
    let questionForm: FormGroup = null;

    // add to form controller
    if (question) {
      questionForm = this._formMakerService.createFormQuestion(false, question);
      this.questions().push(questionForm);
    } else {
      questionForm = this._formMakerService.createFormQuestion(false);
      this.questions().push(questionForm);
    }
  }

  /**
   * remove formgroup from the formarray
   * @param index index of the formgroup to remove
   */
  removeQuestion(index: number): void {
    this.questions().removeAt(index);
  }

  /**
   * Add the dropped question to the form
   */
  addDroppedForm(): void {
    if (this.draggedQuestion instanceof OrderFormQuestionConfig) {
      this.addQuestion(this.draggedQuestion);
    }
    else {
      console.error('dropping not possible');
    }
  }

  /**
   * trackby function for ngfor
   * @param index index
   * @param obj object passed which has an id
   */
  trackById(index: number, obj: any): number {
    return obj.id;
  }

  /**
   * Track the formgroup by id
   * @param index index of the form
   * @param formGroup parent formgroup
   */
  trackFormGroupById(index: number, formGroup: FormGroup): number {
    return formGroup.value.id;
  }

  /**
   * Move formgroup in a formarray
   * @param formArray formarray to sort
   * @param prevIndex previous index of the item
   * @param currentIndex current index of the item
   */
  moveItemInFormArray(formArray: FormArray, prevIndex: number, currentIndex: number): void {
    let item: AbstractControl = formArray.at(prevIndex);
    let insertIndex = currentIndex >= prevIndex ? currentIndex + 1 : currentIndex;
    formArray.insert(insertIndex, item);

    let removeIndex: number = currentIndex >= prevIndex ? prevIndex : prevIndex + 1;
    formArray.removeAt(removeIndex);
  }

  /**
   * handle sorting when dragging ends
   * @param e event
   */
  handleDragSort(e: CdkDragDrop<OrderFormQuestionConfig[]>): void {
    this.moveItemInFormArray(this.questions(), e.previousIndex, e.currentIndex);
  }

  /**
   * Get window height
   */
  public get windowHeight(): string {
    return `${window.innerHeight}px`;
  }

  /**
   * Toggle the child question dialog
   */
  toggleChildQuestionDialog(): void {
    // calculate the width of the overlay window
    this.formsPartWidth = `${
      window.innerWidth -
      this.formsPartContainer.nativeElement.getBoundingClientRect().left
    }px`;

    this.dialogs.childQuestion = !this.dialogs.childQuestion;
  }

  /**
   * Catch the value of the child question emitted from the child component
   * @param value value of the child question
   */
  catchActiveChildQuestion(value: FormQuestionEvent): void {
    this.activeChildQuestion = value;

    this.toggleChildQuestionDialog();
  }

  /**
   * Remove the child question from its parent form array
   * @param index index of the child question
   */
  removeActiveChildQuestion(index: number): void {
    let parentArray = this.activeChildQuestion.parent as FormArray;
    parentArray.removeAt(index);
    this.toggleChildQuestionDialog()
    this.activeChildQuestion = null;
  }
}

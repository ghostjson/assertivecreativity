import { Component, ComponentFactory, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { Color } from "src/app/models/Color";
import { FormQuestionEvent, OrderFormQuestionConfig } from "src/app/models/OrderMailForm";
import { AdminFormsComponentResolverService } from "src/app/services/admin-forms-component-resolver/admin-forms-component-resolver.service";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-maker",
  templateUrl: "./admin-forms-maker.component.html",
  styleUrls: ["./admin-forms-maker.component.scss"]
})
export class AdminFormsMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild("formsPartContainer") formsPartContainer: ElementRef<HTMLElement>;
  
  activeChildQuestion: FormQuestionEvent;
  draggedQuestion: OrderFormQuestionConfig;
  pantoneColors: Color[];
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
    return this.formGroup.get("questions") as FormArray;
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

  removeQuestion(index: number): void {
    // remove from the formgroup
    this.questions().removeAt(index);
  }

  /**
   * Add the dropped question to the form
   */
  addDroppedForm(): void {
    console.log("drop successfully catched: ", this.draggedQuestion);
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
   * Handle drag event start
   * @param question question object that is being dragged
   */
  handleDragStart(question: OrderFormQuestionConfig) {
    this.draggedQuestion = question;
  }

  /**
   * Handle drag event end
   */
  handleDragEnd(): void {
    this.draggedQuestion = null;
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
    console.log('catch in forms maker: ', value.question.value);
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

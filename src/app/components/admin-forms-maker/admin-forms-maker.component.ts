import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Color } from "src/app/models/Color";
import { formQuestionEvent, OrderMailFormQuestion } from "src/app/models/OrderMailForm";

@Component({
  selector: "app-admin-forms-maker",
  templateUrl: "./admin-forms-maker.component.html",
  styleUrls: ["./admin-forms-maker.component.scss"],
})
export class AdminFormsMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild("formsPartContainer") formsPartContainer: ElementRef<HTMLElement>;
  
  activeChildQuestion: formQuestionEvent;

  draggedQuestion: OrderMailFormQuestion;
  pantoneColors: Color[];
  dialogs: {
    childQuestion: boolean;
  };
  formsPartWidth: string;
  _currentChildQuestion: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.dialogs = {
      childQuestion: false,
    };

    console.log("formgroup received: ", this.formGroup.value);
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
  handleDragStart(question: OrderMailFormQuestion) {
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
  catchActiveChildQuestion(value: formQuestionEvent): void {
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

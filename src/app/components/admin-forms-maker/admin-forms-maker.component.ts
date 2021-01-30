import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import {
  FormQuestionEvent,
  OrderFormQuestionConfig,
  OrderFormSectionConfig,
} from "src/app/models/OrderForm";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-maker",
  templateUrl: "./admin-forms-maker.component.html",
  styleUrls: ["./admin-forms-maker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFormsMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild("formsPartContainer") formsPartContainer: ElementRef<HTMLElement>;

  activeChildQuestion: FormQuestionEvent;
  dialogs: {
    childQuestion: boolean;
  };
  formsPartWidth: string;
  newSectionTitle: string;

  constructor(private _formMakerService: AdminOrdersFormMakerService) {}

  ngOnInit(): void {
    this.dialogs = {
      childQuestion: false,
    };
  }

  /**
   * return sections formarray
   */
  sections(): FormArray {
    return this.formGroup.get("sections") as FormArray;
  }

  /**
   * get questions formarray
   */
  questions(sectionIndex: number): FormArray {
    return this.sections().at(sectionIndex).get("questions") as FormArray;
  }

  /**
   * Add a new section to form
   * @param section form section config
   */
  addSection(section: OrderFormSectionConfig = null): void {
    let sectionForm: FormGroup = null;

    // if initial config is present initialise the formgroup with that
    if (section) {
      sectionForm = this._formMakerService.createOrderFormSection(section);
    } else {
      sectionForm = this._formMakerService.createOrderFormSection();
      sectionForm.patchValue({ title: this.newSectionTitle });
    }

    // add section formgroup to the controller
    this.sections().push(sectionForm);

    this.newSectionTitle = "";
  }

  removeSection(sectionIndex: number): void {
    this.sections().removeAt(sectionIndex);
  }

  /**
   * Add a question
   * @param question question object to add to the formarray
   */
  addQuestion(
    sectionIndex: number,
    question: OrderFormQuestionConfig = null
  ): void {
    let questionForm: FormGroup = null;

    // if initial config is present initialise the formgroup with that
    if (question) {
      questionForm = this._formMakerService.createFormQuestion(false, question);
    } else {
      questionForm = this._formMakerService.createFormQuestion(false);
    }

    // add question formgroup to the controller
    this.questions(sectionIndex).push(questionForm);
  }

  /**
   * remove formgroup from the formarray
   * @param index index of the formgroup to remove
   */
  removeQuestion(sectionIndex: number, questionIndex: number): void {
    this.questions(sectionIndex).removeAt(questionIndex);
  }

  /**
   * Add the dropped question to the form
   */
  // addDroppedForm(
  //   droppedQuestion: CdkDragDrop<OrderFormQuestionConfig>,
  //   sectionIndex: number
  // ): void {
  //   let question: OrderFormQuestionConfig =
  //     droppedQuestion.previousContainer.data[0];

  //   if (question) {
  //     console.log("drop detectected: ");
  //     this.addQuestion(sectionIndex, question);
  //   } else {
  //     console.log(question);
  //     console.error("dropping not possible");
  //   }
  // }

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
   * handle sorting when dragging ends
   * @param e event
   */
  handleQuestionsDragSort(
    e: CdkDragDrop<OrderFormQuestionConfig[]>,
    sectionIndex: number
  ): void {
    this._formMakerService.moveItemInFormArray(
      this.questions(sectionIndex),
      e.previousIndex,
      e.currentIndex
    );
  }

  handleSectionsDragSort(e: CdkDragDrop<OrderFormQuestionConfig[]>): void {
    this._formMakerService.moveItemInFormArray(
      this.sections(),
      e.previousIndex,
      e.currentIndex
    );
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
    this.toggleChildQuestionDialog();
    this.activeChildQuestion = null;
  }
}

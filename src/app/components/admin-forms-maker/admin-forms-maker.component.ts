import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Color } from "src/app/models/Color";
import { OrderMailFormQuestion } from "src/app/models/OrderMailForm";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-maker",
  templateUrl: "./admin-forms-maker.component.html",
  styleUrls: ["./admin-forms-maker.component.scss"],
})
export class AdminFormsMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild("formsPartContainer") formsPartContainer: ElementRef<HTMLElement>;

  draggedQuestion: OrderMailFormQuestion;
  pantoneColors: Color[];
  dialogs: {
    childQuestion: boolean;
  };
  formsPartWidth: string;
  currentChildQuestion: FormGroup;

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
}

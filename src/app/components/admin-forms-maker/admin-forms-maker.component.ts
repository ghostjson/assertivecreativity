import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Color } from "src/app/models/Color";
import { OrderMailFormQuestion, OrderMailFormResponse} from "src/app/models/OrderMailForm";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-maker",
  templateUrl: "./admin-forms-maker.component.html",
  styleUrls: ["./admin-forms-maker.component.scss"],
})
export class AdminFormsMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  draggedQuestion: OrderMailFormQuestion;
  questionTypes: SelectItem<string>[];
  pantoneColors: Color[];

  constructor(
    private _formMakerService: AdminOrdersFormMakerService
  ) {}

  ngOnInit(): void {
    console.log('formgroup received: ', this.formGroup.value);
    this.questionTypes = this._formMakerService.getQuestionTypes();
    this.pantoneColors = this._formMakerService.getPantoneColors();
  }

  handleDragStart(question: OrderMailFormQuestion) {
    this.draggedQuestion = question;
  }

  handleDragEnd(): void {
    this.draggedQuestion = null;
  }

  addDroppedForm(): void {
    console.log('drop successfully catched: ', this.draggedQuestion);
    this.addQuestion(this.draggedQuestion);
  }

  /**
   * trackby function for ngfor
   * @param index index
   * @param obj object passed which has an id
   */
  trackById(index: number, obj: any): number {
    return obj.id;
  }

  questions(): FormArray {
    return this.formGroup.get('questions') as FormArray;
  }

  addQuestion(question: OrderMailFormQuestion = null): void {
    if(question) {
      this.questions().push(this._formMakerService.createFormQuestion(question));
    }
    else {
      this.questions().push(this._formMakerService.createFormQuestion());
    }
  }

  removeQuestion(index: number): void {
    this.questions().removeAt(index);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Color } from 'src/app/models/Color';
import { formQuestionEvent, OrderMailFormQuestion } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-question-maker',
  templateUrl: './admin-forms-question-maker.component.html',
  styleUrls: ['./admin-forms-question-maker.component.scss']
})
export class AdminFormsQuestionMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() draggedQuestion: OrderMailFormQuestion;
  @Input() data: any;
  @Output() childQuestionActive = new EventEmitter<formQuestionEvent>();

  questionTypes: SelectItem<string>[];
  pantoneColors: Color[];

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    this.questionTypes = this._formMakerService.getQuestionTypes();
    this.pantoneColors = this._formMakerService.getPantoneColors();
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
   * get questions formarray
   */
  questions(): FormArray {
    return this.formGroup.get("questions") as FormArray;
  }

  /**
   * Add a question to the formarray
   * @param question question object to add to the formarray
   */
  addQuestion(question: OrderMailFormQuestion = null): void {
    if (question) {
      this.questions().push(
        this._formMakerService.createFormQuestion(false, question)
      );
    } else {
      this.questions().push(this._formMakerService.createFormQuestion(false));
    }
  }

  removeQuestion(index: number): void {
    this.questions().removeAt(index);
  }

  /**
   * Add the dropped question to the form
   */
  addDroppedForm(): void {
    console.log("drop successfully catched: ", this.draggedQuestion);
    if (this.draggedQuestion) {
      this.addQuestion(this.draggedQuestion);
    }
  }

  /**
   * Emit the child question formgroup recevied
   * @param value active child question formgroup
   */
  emitActiveChildQuestion(value: formQuestionEvent): void {
    console.log('emit from question maker: ', value);
    this.childQuestionActive.emit(value);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { formQuestionEvent } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-admin-forms-question-maker-question',
  templateUrl: './admin-forms-question-maker-question.component.html',
  styleUrls: ['./admin-forms-question-maker-question.component.scss']
})
export class AdminFormsQuestionMakerQuestionComponent implements OnInit {
  @Input() question: FormGroup;
  @Input() questionIndex: number;
  @Input() data: any;

  @Output() removeQuestion = new EventEmitter<number>();
  @Output() childQuestionActive = new EventEmitter<formQuestionEvent>();

  questionTypes: SelectItem<string>[];

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
    this.questionTypes = this._formMakerService.getQuestionTypes();
  }
  
  /**
   * Emit the value of the child question received
   * @param value value of the child question emitted from child component
   */
  emitActiveChildQuestion(value: formQuestionEvent): void {
    console.log('emit from question maker question component: ', value);
    this.childQuestionActive.emit(value);
  }
}

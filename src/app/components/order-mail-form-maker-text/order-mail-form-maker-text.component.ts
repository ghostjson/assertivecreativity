import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker-text',
  templateUrl: './order-mail-form-maker-text.component.html',
  styleUrls: ['./order-mail-form-maker-text.component.scss']
})
export class OrderMailFormMakerTextComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() questionIndex: number;

  constructor(private _formMakerService: AdminOrdersFormMakerService) { }

  ngOnInit(): void {
  }

  questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  inputs(questionIndex: number): FormArray {
    return this.questions().at(questionIndex).get('inputs') as FormArray;
  }

  removeQuestion(): void {
    this.questions().removeAt(this.questionIndex);
  }

  removeQuestionInput(inputIndex: number): void {
    this.inputs(this.questionIndex).removeAt(inputIndex);
  }
}

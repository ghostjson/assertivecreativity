import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-custom-form-question-paragraph',
  templateUrl: './custom-form-question-paragraph.component.html',
  styleUrls: ['./custom-form-question-paragraph.component.scss']
})
export class CustomFormQuestionParagraphComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

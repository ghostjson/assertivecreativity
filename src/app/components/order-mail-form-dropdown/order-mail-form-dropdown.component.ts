import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderMailFormQuestion, OrderMailFormQuestionEntry } from 'src/app/models/OrderMailForm';

@Component({
  selector: 'app-order-mail-form-dropdown',
  templateUrl: './order-mail-form-dropdown.component.html',
  styleUrls: ['./order-mail-form-dropdown.component.scss']
})
export class OrderMailFormDropdownComponent implements OnInit {
  @Input() question: OrderMailFormQuestion;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // add an none input 
    this.question.inputs.unshift({
      label: 'Select an option',
      value: null
    });
  }
}

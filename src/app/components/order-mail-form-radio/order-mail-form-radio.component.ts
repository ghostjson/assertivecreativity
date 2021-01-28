import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';

@Component({
  selector: 'app-order-mail-form-radio',
  templateUrl: './order-mail-form-radio.component.html',
  styleUrls: ['./order-mail-form-radio.component.scss']
})
export class OrderMailFormRadioComponent implements OnInit {
  @Input() question: OrderFormQuestionConfig;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

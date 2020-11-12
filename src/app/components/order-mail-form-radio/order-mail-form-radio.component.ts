import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderMailFormQuestion } from 'src/app/models/OrderMailForm';

@Component({
  selector: 'app-order-mail-form-radio',
  templateUrl: './order-mail-form-radio.component.html',
  styleUrls: ['./order-mail-form-radio.component.scss']
})
export class OrderMailFormRadioComponent implements OnInit {
  @Input() question: OrderMailFormQuestion;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

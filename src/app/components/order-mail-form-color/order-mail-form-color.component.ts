import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderMailForm';

@Component({
  selector: 'app-order-mail-form-color',
  templateUrl: './order-mail-form-color.component.html',
  styleUrls: ['./order-mail-form-color.component.scss']
})
export class OrderMailFormColorComponent implements OnInit {
  @Input() question: OrderFormQuestionConfig;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

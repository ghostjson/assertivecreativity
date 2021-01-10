import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderMailFormQuestion } from 'src/app/models/OrderMailForm';

@Component({
  selector: 'app-order-mail-form-date-picker',
  templateUrl: './order-mail-form-date-picker.component.html',
  styleUrls: ['./order-mail-form-date-picker.component.scss']
})
export class OrderMailFormDatePickerComponent implements OnInit {
  @Input() question: OrderMailFormQuestion;
  @Input() form: FormGroup;

  minDate: Date;

  constructor() { }

  ngOnInit(): void {
    let tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow;
  }
}

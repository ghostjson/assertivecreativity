import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-order-mail-form-dropdown',
  templateUrl: './order-mail-form-dropdown.component.html',
  styleUrls: ['./order-mail-form-dropdown.component.scss']
})
export class OrderMailFormDropdownComponent implements OnInit {
  @Input() question: OrderFormQuestionConfig;
  @Input() form: FormGroup;

  constructor(private _idGenService: IdGeneratorService) { }

  ngOnInit(): void {
    // add an none input 
    this.question.inputs.unshift({
      id: this._idGenService.getId(),
      label: 'Select an option',
      value: null
    });
  }
}

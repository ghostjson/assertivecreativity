import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderMailFormQuestion } from 'src/app/models/OrderMailForm';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-order-mail-form-dropdown',
  templateUrl: './order-mail-form-dropdown.component.html',
  styleUrls: ['./order-mail-form-dropdown.component.scss']
})
export class OrderMailFormDropdownComponent implements OnInit {
  @Input() question: OrderMailFormQuestion;
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

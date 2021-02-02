import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderFormQuestionConfig } from 'src/app/models/OrderForm';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-custom-form-question-dropdown',
  templateUrl: './custom-form-question-dropdown.component.html',
  styleUrls: ['./custom-form-question-dropdown.component.scss']
})
export class CustomFormQuestionDropdownComponent implements OnInit {
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionFormGroup: FormGroup;

  constructor(private _idGenService: IdGeneratorService) { }

  ngOnInit(): void {
    this.questionConfig.inputs.unshift({
      id: this._idGenService.getId(),
      label: 'Select an option',
      value: null
    });
  }
}

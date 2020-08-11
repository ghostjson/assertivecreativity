import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feature } from '../../models/Product';

@Component({
  selector: 'app-product-options-question',
  templateUrl: './product-options-question.component.html',
  styleUrls: ['./product-options-question.component.scss']
})

export class ProductOptionsQuestionComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() feature: Feature;
  @Input() featureInd: number;
  @Input() chainedInd: number;
  @Input() requiredInp: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}

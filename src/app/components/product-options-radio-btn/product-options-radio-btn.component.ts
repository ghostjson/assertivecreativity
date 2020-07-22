import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupName, FormArrayName } from '@angular/forms';

@Component({
  selector: 'app-product-options-radio-btn',
  templateUrl: './product-options-radio-btn.component.html',
  styleUrls: ['./product-options-radio-btn.component.scss']
})
export class ProductOptionsRadioBtnComponent implements OnInit {
  @Input() feature: any;
  @Input() featureInd: number;
  @Input() chainedInd: number;
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

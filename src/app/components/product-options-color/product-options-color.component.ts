import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-options-color',
  templateUrl: './product-options-color.component.html',
  styleUrls: ['./product-options-color.component.scss']
})
export class ProductOptionsColorComponent implements OnInit {
  @Input() feature: any;
  @Input() featureInd: number;
  @Input() chainedInd: number;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }
}

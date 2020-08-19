import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupName, FormArrayName } from '@angular/forms';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-product-options-radio-btn',
  templateUrl: './product-options-radio-btn.component.html',
  styleUrls: ['./product-options-radio-btn.component.scss']
})
export class ProductOptionsRadioBtnComponent implements OnInit {
  @Input() option: any;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;

  selectedCategory: any;

  id: number;
  featureInd: number = 12;
  chainedInd: number = 3;

  constructor(
    public _idGen: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.id = this._idGen.getId();
  }

}

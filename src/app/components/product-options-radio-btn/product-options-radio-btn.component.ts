import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormGroupName, FormArrayName } from '@angular/forms';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { Option } from 'src/app/models/Product';
import { info } from 'console';

@Component({
  selector: 'app-product-options-radio-btn',
  templateUrl: './product-options-radio-btn.component.html',
  styleUrls: ['./product-options-radio-btn.component.scss']
})
export class ProductOptionsRadioBtnComponent implements OnInit {
  @Input() option: Option;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;

  selectedCategory: any;

  id: number;

  constructor(
    public _idGen: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.id = this._idGen.getId();
    console.info('radio options: ', this.option);
  }

  emitIndex(event: Event, index: number): void {
    event.stopPropagation();
    console.log('index of input: ', index);
  }
}

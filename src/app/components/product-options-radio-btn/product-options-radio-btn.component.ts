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

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  selectedCategory: any;

  id: number;

  constructor(
    public _idGen: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.id = this._idGen.getId();
    console.info('radio options: ', this.option);
  }

  emitValue(event: any): void {
    this.onChange.emit(event);
  }
}

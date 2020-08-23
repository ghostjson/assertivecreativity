import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-product-options-color',
  templateUrl: './product-options-color.component.html',
  styleUrls: ['./product-options-color.component.scss']
})
export class ProductOptionsColorComponent implements OnInit {
  @Input() option: any;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;
  
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  ids: number[] = [];

  constructor(
    private _idGen: IdGeneratorService
  ) {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.option.inputs.length; ++i) {
      this.ids.push(this._idGen.getId());
    }
  }

  emitValue(event: any): void {
    this.onChange.emit(event);
  }
}

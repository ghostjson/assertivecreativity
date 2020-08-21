import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { CustomOptionForm } from 'src/app/models/Order';
import { Option } from 'src/app/models/Product';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss']
})
export class ProductOptionsComponent implements OnInit {
  @Input() option: Option;
  @Input() requiredInp: boolean;
  @Input() formGroup: CustomOptionForm;

  chainedOptionsDict: any = {};

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.info('option received: ', this.option);
    
  }

  chainedOptions(): FormArray {
    return this.formGroup.get('chainedOptions') as FormArray;
  }

  constructChained(): void {
    this.option.inputs.forEach((input) => {
      
    });
  }
}

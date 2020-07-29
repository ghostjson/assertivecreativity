import { Component, OnInit, Input } from '@angular/core';

import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
import { FormGroup, FormArray } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-admin-color-option-maker',
  templateUrl: './admin-color-option-maker.component.html',
  styleUrls: ['./admin-color-option-maker.component.scss']
})
export class AdminColorOptionMakerComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() optionInd: number;

  color: string = '#AC7B19';

  constructor(
    public _productService: VendorAdminProductService
  ) { }

  ngOnInit(): void {
  }

  inputs(): FormArray {
    return this.formGroup.get('inputs') as FormArray;
  }
}

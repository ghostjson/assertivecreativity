import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feature } from '../../models/Product';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-product-options-dropdown',
  templateUrl: './product-options-dropdown.component.html',
  styleUrls: ['./product-options-dropdown.component.scss']
})
export class ProductOptionsDropdownComponent implements OnInit {
  @Input() option: any;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;

  // list of options for the Dropdown
  dropdownList: SelectItem[];

  constructor() { }

  ngOnInit(): void {
    this.dropdownList = [];

    // copy the list passed to the component
    this.dropdownList.push({
      label: `--${this.option.title}--`,
      value: null
    })
    this.option.inputs.forEach((input) => {
      this.dropdownList.push({
        label: input.choiceText,
        value: input.choiceValue
      });
    });
    console.log(this.dropdownList);
  }

}

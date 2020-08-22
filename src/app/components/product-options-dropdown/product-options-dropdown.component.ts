import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feature } from '../../models/Product';
import { SelectItem } from 'primeng/api';
import { clear } from 'console';

@Component({
  selector: 'app-product-options-dropdown',
  templateUrl: './product-options-dropdown.component.html',
  styleUrls: ['./product-options-dropdown.component.scss']
})
export class ProductOptionsDropdownComponent implements OnInit {
  @Input() option: any;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

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
        label: input.label,
        value: input.value
      });
    });
    console.log(this.dropdownList);
  }

  emitValue(event: any): void {
    // event.stopPropagation();
    this.onChange.emit(event.value);
    // console.clear();
    console.info('index of input: ', event.value);
  }
}

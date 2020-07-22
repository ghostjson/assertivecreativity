import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-options-dropdown',
  templateUrl: './product-options-dropdown.component.html',
  styleUrls: ['./product-options-dropdown.component.scss']
})
export class ProductOptionsDropdownComponent implements OnInit {
  @Input() feature: any;
  @Input() featureInd: number;
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

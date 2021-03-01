import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-custom-product-crud-form-basic-details',
  templateUrl: './admin-custom-product-crud-form-basic-details.component.html',
  styleUrls: ['./admin-custom-product-crud-form-basic-details.component.scss']
})
export class AdminCustomProductCrudFormBasicDetailsComponent implements OnInit {
  @Input() baseProductForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

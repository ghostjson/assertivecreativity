import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-form-options',
  templateUrl: './admin-form-options.component.html',
  styleUrls: ['./admin-form-options.component.scss']
})
export class AdminFormOptionsComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() option: FormGroup;
  @Input() ind: number;

  constructor() { }

  ngOnInit(): void {
  }

}

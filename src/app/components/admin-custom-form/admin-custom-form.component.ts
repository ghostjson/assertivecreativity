import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-custom-form',
  templateUrl: './admin-custom-form.component.html',
  styleUrls: ['./admin-custom-form.component.scss']
})
export class AdminCustomFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formCount: number;
  @Input() formId: number;

  constructor() { }

  ngOnInit(): void {
  }

  // count to n
  // count(n: number): Array<number> {
  //   return Array(n).fill(0).map((x,i)=>i);
  // }

  getFormIds(): SelectItem[] {
    let formIds = [];
    formIds.push({
      label: 'None',
      value: null
    });

    for (let i = 0; i < this.formCount; ++i) {
      if (i !== this.formId) {
        formIds.push({
          label: `Form ID ${i}`,
          value: i
        });
      }
    }

    return formIds;
  }
}

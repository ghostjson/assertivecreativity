import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-category-selector',
  templateUrl: './admin-category-selector.component.html',
  styleUrls: ['./admin-category-selector.component.scss']
})
export class AdminCategorySelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;

  cars: SelectItem[];

  constructor() { }

  ngOnInit(): void {
    this.cars = [
      { label: 'None', value: 'none' },
      { label: 'Cloth', value: 'cloth' },
      { label: 'Scarf', value: 'scarf' },
      { label: 'Shorts', value: 'shorts' },
      { label: 'Socks', value: 'socks' },
      { label: 'Kashmiri Scarf', value: 'kashmiriscarf' },
      { label: 'Caps', value: 'caps' },
      { label: 'Underwear', value: 'underwear' },
      { label: 'T-Shirt', value: 'tshirt' },
      { label: 'Shirt', value: 'shirt' },
    ];
  }

}

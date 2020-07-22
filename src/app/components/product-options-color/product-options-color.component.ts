import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-options-color',
  templateUrl: './product-options-color.component.html',
  styleUrls: ['./product-options-color.component.scss']
})
export class ProductOptionsColorComponent implements OnInit {
  @Input() feature: any;
  @Input() featureInd: number;
  @Input() formGroup: FormGroup;

  constructor() {
  }

  randomNum() {
    return Math.floor(Math.random() * 1092312);
  }

  ind: number;

  ngOnInit(): void {
    this.ind = this.randomNum();
  }
}

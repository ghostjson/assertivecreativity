import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss']
})
export class ProductOptionsComponent implements OnInit {
  @Input() option: any;
  @Input() requiredInp: boolean;
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

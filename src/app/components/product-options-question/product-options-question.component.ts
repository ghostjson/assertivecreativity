import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feature } from '../../models/Product';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-product-options-question',
  templateUrl: './product-options-question.component.html',
  styleUrls: ['./product-options-question.component.scss']
})

export class ProductOptionsQuestionComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() option: Feature;
  @Input() requiredInp: boolean;

  id: number;

  constructor(
    public _idGen: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.id = this._idGen.getId();
  }
}

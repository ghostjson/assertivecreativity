import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feature } from '../../models/Product';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { log } from 'console';

@Component({
  selector: 'app-product-options-question',
  templateUrl: './product-options-question.component.html',
  styleUrls: ['./product-options-question.component.scss']
})

export class ProductOptionsQuestionComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() option: any;
  @Input() requiredInp: boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  id: number;

  constructor(
    public _idGen: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.id = this._idGen.getId();
  }

  emitValue(event: Event): void {
    event.stopPropagation();
    event.preventDefault()
    this.onChange.emit('undefined');
  }
}

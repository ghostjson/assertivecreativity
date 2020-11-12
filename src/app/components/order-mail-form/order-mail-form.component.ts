import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OrderMailForm } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form',
  templateUrl: './order-mail-form.component.html',
  styleUrls: ['./order-mail-form.component.scss']
})
export class OrderMailFormComponent implements OnInit {
  @Input() form: OrderMailForm;
  @Input() formReceiver: boolean;
  
  formEntries: FormArray;

  constructor(
    private _fb: FormBuilder,
    private _orderFormService: AdminOrdersFormMakerService
  ) { }

  ngOnInit(): void {
    this.formEntries = this._orderFormService.createOrderMailFormEntry(this.form.questions);
  }
}

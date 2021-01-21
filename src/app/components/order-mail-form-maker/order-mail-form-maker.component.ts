import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Color } from 'src/app/models/Color';
import { OrderMailForm, OrderMailFormQuestion } from 'src/app/models/OrderMailForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker',
  templateUrl: './order-mail-form-maker.component.html',
  styleUrls: ['./order-mail-form-maker.component.scss']
})
export class OrderMailFormMakerComponent {
  
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';

@Component({
  selector: 'app-order-mail-form-maker-text',
  templateUrl: './order-mail-form-maker-text.component.html',
  styleUrls: ['./order-mail-form-maker-text.component.scss']
})
export class OrderMailFormMakerTextComponent {
  @Input() form: FormGroup;

  /**
   * Get inputs of the question
   */
  public get inputs(): FormArray {
    return this.form.get('inputs') as FormArray;
  }
}

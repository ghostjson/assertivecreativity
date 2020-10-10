import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { TreeNode } from 'primeng/api';

export class Order {
  id?: number;
  cartId?: number;
  name: string;
  description: string;
  totalPrice: number;
  orderDate: string;
  deliveryDate: string;
  image: string;
  status: string;
  mailThread?: number;
  customForms: CustomFormInput[]
}

export class CustomFormInput {
  title: string;
  options: CustomOption[]
}

export class CustomOption {
  name: string;
  title: string;
  type: string;
  price: number;
  input: any;
  meta: OptionMeta;
  chained_options?: CustomOption[]
}

export class OptionMeta {
  isChained: boolean;
  chainedOpsHidden?: boolean;
}

export class CustomOptionForm extends FormGroup {
  name: FormControl;
  title: FormControl;
  type: FormControl;
  price: FormControl;
  input: FormControl;
  meta: FormGroup;
  chained_options?: FormArray
}

export type OrderSummaryTable = TreeNode[];
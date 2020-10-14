import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { Product } from './Product';

export class Order {
  id?: number;
  product_id: number;
  buyer_id: number;
  seller_id: number;
  created_at?: string;
  updated_at?: string;
  delivery_date?: string;
  order_status: string;
  payment_id?: number;
  data: OrderData;
}

export class OrderData {
  quantity: number;
  total_price: number;
  mail_thread?: number;
  product_details: Product;
  /**
   * TODO: fix after api is fixed with the array to string error
   */
  custom_forms: CustomFormInput[];
}

export class CustomFormInput {
  id?: number;
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
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { Product, ProductAttribute, ProductImage } from './Product';

export class Order {
  id?: number;
  product_id: number;
  buyer_id?: number;
  seller_id?: number;
  created_at?: string;
  updated_at?: string;
  delivery_date: OrderDeliveryDates;
  order_status?: string;
  payment_id?: number;
  data: OrderData;
}

export class OrderDeliveryDates {
  delivery_dates: string[];
  meeting_dates: string[];
  confirmation_dates: string[];
}

export class OrderData {
  is_stock: boolean;
  quantity: number;
  total_price: number;
  mail_thread?: number;
  product_details: Product;
  dates?: OrderAttribute[];
  stock_order_attributes?: OrderAttribute[];
  custom_order_attributes?: OrderAttribute[];
  custom_forms_entry?: any;
}

export interface OrderAttribute {
  id?: number;
  attribute_label?: string;
  attribute_value?: string;
  attribute_type?: string;
  attribute_cost?: number;
  attribute_price?: number;
  attribute_images?: ProductImage[];
  child_attributes?: OrderAttribute[];
  input?: any | OrderAttributeInput | ProductAttribute;
}

export interface OrderAttributeInput {
  label?: string;
  value?: string;
  cost?: number;
  price?: number;
  type?: string;
  images?: ProductImage[];
}
export class CustomFormsEntry {
  id: number;
  title: string;
  is_formgroup?: boolean;
  parent_form?: number;
  options?: CustomOption[];
  subforms?: CustomFormInput[];
}

export class CustomFormInput {
  id: number;
  title: string;
  parent_form: number;
  options: CustomOption[];
}

export class CustomOption {
  name: string;
  title: string;
  type: string;
  price: number;
  input: any;
  meta: OptionMeta;
  chained_options?: CustomOption[];
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
  chained_options?: FormArray;
}

export type OrderSummaryTable = TreeNode[];

export interface OrderResponse {
  data: Order[];
  message?: string;
}

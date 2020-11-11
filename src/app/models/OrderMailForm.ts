export interface OrderMailForm {
  id?: number;
  title: string;
  questions: OrderMailFormQuestion[];
}

export interface OrderMailFormQuestion {
  id?: number;
  label: string;
  placeholder?: string;
  type: string;
  inputs: FormInput[];
}

export interface FormInput<ValueType = any> {
  id?: number;
  label: string;
  placeholder?: string;
  value?: ValueType;
}

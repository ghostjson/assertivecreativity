import { SelectItem } from 'primeng/api';

export interface OrderMailForm {
  id?: number;
  title: string;
  questions: OrderMailFormQuestion[];
  entry?: OrderMailFormQuestionEntry[];
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

export interface OrderMailFormQuestionEntry {
  id?: number;
  question: string;
  type: string;
  label: string;
  input_value: any;
}
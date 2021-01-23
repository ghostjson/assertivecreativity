export interface OrderMailForm {
  id: number;
  title: string;
  questions: OrderMailFormQuestion[];
  entry?: OrderMailFormQuestionEntry[];
}

export interface OrderMailFormQuestion {
  id: number;
  label: string;
  placeholder?: string;
  type: string;
  inputs: FormInput[];
}

export interface FormInput<ValueType = any> {
  id: number;
  label: string;
  value?: ValueType;
  placeholder?: string;
  children_form_questions?: OrderMailFormQuestion[];
}

export interface OrderMailFormQuestionEntry {
  id: number;
  question: string;
  type: string;
  label: string;
  input_value: any;
}

export interface OrderMailFormResponse {
  id: number;
  name?: string;
  data: OrderMailForm;
  created_at?: string;
  updated_at?: string;
}
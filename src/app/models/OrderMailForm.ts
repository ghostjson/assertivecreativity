import { FormArray, FormGroup } from "@angular/forms";
import { SelectItem } from "primeng/api";
export class OrderFormConfig {
  id: number;
  title: string;
  questions: OrderFormQuestionConfig[];
  entry?: OrderFormQuestionEntry[];
}

export class OrderFormQuestionConfig {
  id: number;
  label: string;
  placeholder?: string;
  type: string;
  is_child: boolean;
  inputs: OrderFormInputConfig[];
}

export class OrderFormInputConfig<ValueType = any> {
  id: number;
  label: string;
  value?: ValueType;
  placeholder?: string;
  children_form_questions?: OrderFormQuestionConfig[];
}

export class OrderFormQuestionEntry {
  id: number;
  question: string;
  type: string;
  label: string;
  input_value: any;
}

export class OrderFormResponse {
  id: number;
  name?: string;
  data: OrderFormConfig;
  created_at?: string;
  updated_at?: string;
}

export interface FormQuestionEvent {
  question: FormGroup;
  parent: FormArray | FormGroup;
  questionIndex: number;
}

export interface QuestionType extends SelectItem<string> {
  component: any,
  data?: any;
}

export const QUESTION_TYPES: SelectItem<string>[]  = [
  {
    label: 'Dropdown',
    value: 'dropdown'
  },
  {
    label: 'Radio Button',
    value: 'radio'
  },
  {
    label: 'Paragraph Input',
    value: 'paragraph'
  },
  {
    label: 'Color Input',
    value: 'color'
  },
  {
    label: 'Date Input',
    value: 'datePicker'
  }
];
import { FormArray, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { PANTONE_COLORS } from "src/assets/js/pantone-colors";
import { SelectItem } from "primeng/api";

export class OrderFormConfig {
  id: number;
  title: string;
  questions: OrderFormQuestionConfig[];
  entry?: OrderFormQuestionEntry[];
}

export interface ValidationDict {
  min?: boolean;
  max?: boolean;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: boolean;
  nullValidator?: boolean;
}

export class OrderFormQuestionConfig {
  id: number;
  label: string;
  placeholder?: string;
  type: string;
  is_child: boolean;
  validators: ValidationDict;
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
  component?: any,
  data?: any;
}

export const QUESTION_TYPES: QuestionType[]  = [
  {
    label: 'Dropdown',
    value: 'dropdown',
    data: {}
  },
  {
    label: 'Radio Button',
    value: 'radio',
    data: {}
  },
  {
    label: 'Paragraph Input',
    value: 'paragraph',
    data: {}
  },
  {
    label: 'Color Input',
    value: 'color',
    data: {
      pantoneColors: PANTONE_COLORS
    }
  },
  {
    label: 'Date Input',
    value: 'datePicker',
    data: {}
  }
];
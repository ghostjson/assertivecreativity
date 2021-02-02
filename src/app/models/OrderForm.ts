import { FormArray, FormGroup } from "@angular/forms";
import { PANTONE_COLORS } from "src/assets/js/pantone-colors";
import { SelectItem } from "primeng/api";

/**
 * Model for Order Form Configuration
 */
export class OrderFormConfig {
  id: number;
  title: string;
  sections: OrderFormSectionConfig[];
}

export class OrderFormSectionConfig {
  id: number;
  title: string;
  required: boolean;
  questions?: OrderFormQuestionConfig[];
}

/**
 * Model for Question configuration in the order form
 */
export class OrderFormQuestionConfig {
  id: number;
  label: string;
  placeholder?: string;
  type: string;
  is_child: boolean;
  properties: any;
  validators: ValidationDict;
  inputs: OrderFormInputConfig[];
}

/**
 * Model for Order form Input configuration
 */
export class OrderFormInputConfig<ValueType = any> {
  id: number;
  label: string;
  value?: ValueType;
  placeholder?: string;
  children_form_questions?: OrderFormQuestionConfig[];
}

export interface CustomFormEntry {
  id: number;
  sectionEntries: CustomFormSectionEntry[];
}

export interface CustomFormSectionEntry {
  id: number;
  required: boolean;
  questionEntries: CustomFormQuestionEntry[];
}

export interface CustomFormQuestionEntry {
  id: number;
  input: CustomFormInputEntry;
}

export interface CustomFormInputEntry {
  label: string;
  value: string;
}

/**
 * Model for user entry of order form
 */
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

/**
 * Model for Validation dictionary
 */
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

export const QUESTION_TYPES: QuestionType[]  = [
  {
    label: 'Dropdown',
    value: 'dropdown',
    data: {}
  },
  {
    label: 'Multiple Choice',
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
  },
  {
    label: 'Checkboxes',
    value: 'checkbox',
    data: {}
  }
];
import { Injectable } from '@angular/core';
import { CustomFormQuestionCheckboxComponent } from 'src/app/components/custom-form-question-checkbox/custom-form-question-checkbox.component';
import { CustomFormQuestionColorComponent } from 'src/app/components/custom-form-question-color/custom-form-question-color.component';
import { CustomFormQuestionDatePickerComponent } from 'src/app/components/custom-form-question-date-picker/custom-form-question-date-picker.component';
import { CustomFormQuestionDropdownComponent } from 'src/app/components/custom-form-question-dropdown/custom-form-question-dropdown.component';
import { CustomFormQuestionParagraphComponent } from 'src/app/components/custom-form-question-paragraph/custom-form-question-paragraph.component';
import { CustomFormQuestionRadioComponent } from 'src/app/components/custom-form-question-radio/custom-form-question-radio.component';
import { QuestionType } from 'src/app/models/OrderForm';

@Injectable({
  providedIn: 'root'
})
export class FormComponentResolverService {
  private static componentDict: { [key: string]: QuestionType } = {
    dropdown: {
      label: 'Dropdown',
      value: 'dropdown',
      component: CustomFormQuestionDropdownComponent
    },
    radio: {
      label: 'Radio Buttons',
      value: 'radio',
      component: CustomFormQuestionRadioComponent
    },
    paragraph: {
      label: 'Paragraph Input',
      value: 'paragraph',
      component: CustomFormQuestionParagraphComponent
    },
    color: {
      label: 'Color Input',
      value: 'color',
      component: CustomFormQuestionColorComponent
    },
    datePicker: {
      label: 'Date Input',
      value: 'datePicker',
      component: CustomFormQuestionDatePickerComponent
    },
    checkbox: {
      label: 'Checkboxes',
      value: 'checkbox',
      component: CustomFormQuestionCheckboxComponent
    }
  };

  constructor() { }

  getComponent(type: string): any {
    return FormComponentResolverService.componentDict[type].component;
  }

  getDataOf(type: string): any {
    return FormComponentResolverService.componentDict[type].data;
  }
}

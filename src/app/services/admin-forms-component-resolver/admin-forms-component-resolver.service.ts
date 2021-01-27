import { ComponentFactoryResolver } from "@angular/core";
import { ComponentFactory } from "@angular/core";
import { Injectable } from "@angular/core";
import { PANTONE_COLORS } from "src/assets/js/pantone-colors";
import { AdminFormsQuestionMakerColorComponent } from "src/app/components/admin-forms-question-maker-color/admin-forms-question-maker-color.component";
import { AdminFormsQuestionMakerDatePickerComponent } from "src/app/components/admin-forms-question-maker-date-picker/admin-forms-question-maker-date-picker.component";
import { AdminFormsQuestionMakerDropdownComponent } from "src/app/components/admin-forms-question-maker-dropdown/admin-forms-question-maker-dropdown.component";
import { AdminFormsQuestionMakerParagraphComponent } from "src/app/components/admin-forms-question-maker-paragraph/admin-forms-question-maker-paragraph.component";
import { AdminFormsQuestionMakerRadioComponent } from "src/app/components/admin-forms-question-maker-radio/admin-forms-question-maker-radio.component";
import { QuestionType } from "src/app/models/OrderMailForm";

@Injectable({
  providedIn: "root",
})
export class AdminFormsComponentResolverService {
  private componentDict: { [key: string]: QuestionType } = {
    dropdown: {
      label: "Dropdown",
      value: "dropdown",
      component: AdminFormsQuestionMakerDropdownComponent,
    },
    radio: {
      label: "Radio Button",
      value: "radio",
      component: AdminFormsQuestionMakerRadioComponent,
    },
    paragraph: {
      label: "Paragraph Input",
      value: "paragraph",
      component: AdminFormsQuestionMakerParagraphComponent,
    },
    color: {
      label: "Color Input",
      value: "color",
      component: AdminFormsQuestionMakerColorComponent,
      data: {
        pantoneColors: PANTONE_COLORS,
      },
    },
    datePicker: {
      label: "Date Input",
      value: "datePicker",
      component: AdminFormsQuestionMakerDatePickerComponent,
    }
  };

  constructor(private _cfresolver: ComponentFactoryResolver) {
  }

  getComponent(questionType: string): ComponentFactory<any> {
    return this._cfresolver.resolveComponentFactory(
      this.componentDict[questionType].component
    );
  }
}

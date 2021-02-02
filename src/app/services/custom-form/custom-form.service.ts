import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CustomFormEntry, CustomFormQuestionEntry, CustomFormSectionEntry, OrderFormConfig, OrderFormQuestionConfig, OrderFormSectionConfig, ValidationDict } from 'src/app/models/OrderForm';
import { IdGeneratorService } from '../id-generator.service';

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  constructor(
    private _idGenService: IdGeneratorService,
    private _fb: FormBuilder
  ) { }

  createQuestion(questionConfig: OrderFormQuestionConfig, initial: CustomFormQuestionEntry = null): FormGroup {
    let questionTemplate = null;

    if(initial) {
      questionTemplate = {
        id: initial.id,
        input: [
          initial.input,
          this.addValidators(questionConfig.validators)
        ]
      };
    } else {
      questionTemplate = {
        id: this._idGenService.getId(),
        input: [
          '',
          this.addValidators(questionConfig.validators)
        ]
      };
    }

    return this._fb.group(questionTemplate);
  }

  createSection(sectionConfig: OrderFormSectionConfig, initial: CustomFormSectionEntry = null): FormGroup {
    let sectionTemplate = null;

    if(initial) {
      sectionTemplate = {
        id: initial.id,
        required: initial.required,
        questionEntries: this._fb.array(
          initial.questionEntries.map((entry, index: number) => {
            return this.createQuestion(sectionConfig.questions[index], entry);
          })
        )
      };
    } else {
      sectionTemplate = {
        id: this._idGenService.getId(),
        required: sectionConfig.required,
        questionEntries: this._fb.array(
          sectionConfig.questions.map(question => {
            return this.createQuestion(question);
          })
        )
      };
    }

    return this._fb.group(sectionTemplate);
  }

  createForm(formConfig: OrderFormConfig, initial: CustomFormEntry = null): FormGroup {
    let formTemplate = null;

    if(initial) {
      formTemplate = {
        id: initial.id,
        sectionEntries: this._fb.array(
          initial.sectionEntries.map((entry, index) => {
            return this.createSection(formConfig.sections[index], entry)
          })
        )
      }
    } else {
      formTemplate = {
        id: this._idGenService.getId(),
        sectionEntries: this._fb.array(
          formConfig.sections.map(section => {
            return this.createSection(section)
          })
        )
      }
    }

    return this._fb.group(formTemplate);
  }

  addValidators(validationDict: ValidationDict): ValidatorFn[] {
    return Object.keys(validationDict)
    .filter(validator => {
      return validationDict[validator];
    })
    .map(validator => {
      return Validators[validator];
    });
  }
}

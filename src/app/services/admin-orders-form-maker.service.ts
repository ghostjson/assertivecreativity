import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { IdGeneratorService } from './id-generator.service';
import { PANTONE_COLORS } from '../../assets/js/pantone-colors';
import { Color } from '../models/Color';
import { FormInput } from '../models/OrderMailForm';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersFormMakerService {

  constructor(
    private _fb: FormBuilder,
    private _idGenService: IdGeneratorService
  ) { }

  getQuestionTypes(): SelectItem<string>[] {
    return [
      {
        label: 'Dropdown',
        value: 'dropdown'
      },
      {
        label: 'Radio Button',
        value: 'radio'
      },
      {
        label: 'Text',
        value: 'text'
      },
      {
        label: 'Color Input',
        value: 'color'
      }
    ];
  }

  createQuestionInput(initial: FormInput = null): FormGroup {
    let questionInput: FormGroup;

    if(initial) {
      questionInput = this._fb.group({
        id: this._idGenService.getId(),
        ...initial
      });
    }
    else {
      questionInput = this._fb.group({
        id: this._idGenService.getId(),
        label: '',
        placeholder: '',
        value: ''
      });
    }

    console.log('question input created: ', questionInput.value);
    return questionInput;
  }

  createFormQuestion(): FormGroup {
    let formQuestion: FormGroup = this._fb.group({
      id: this._idGenService.getId(),
      label: '',
      placeholder: '',
      type: 'dropdown',
      inputs: this._fb.array([
        this.createQuestionInput()
      ])
    });

    console.log('form question created: ', formQuestion.value);
    return formQuestion;
  }

  createOrderMailForm(): FormGroup {
    let mailForm: FormGroup = this._fb.group({
      id: this._idGenService.getId(),
      title: 'Form Title',
      questions: this._fb.array([
        this.createFormQuestion()
      ])
    });

    console.log('Mail form created: ', mailForm.value);
    return mailForm;
  }

  getPantoneColors(): Color[] {
    return PANTONE_COLORS;
  }
}

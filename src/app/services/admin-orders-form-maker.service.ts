import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { IdGeneratorService } from './id-generator.service';
import { PANTONE_COLORS } from '../../assets/js/pantone-colors';
import { Color } from '../models/Color';
import { FormInput, OrderMailForm, OrderMailFormQuestion, OrderMailFormResponse } from '../models/OrderMailForm';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersFormMakerService {

  constructor(
    private _fb: FormBuilder,
    private _idGenService: IdGeneratorService,
    private _http: HttpClient
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
      },
      {
        label: 'Date Input',
        value: 'date-picker'
      }
    ];
  }

  /**
   * Return forms link
   */
  formsLink(): string {
    return `${environment.apiUrl}/orders/forms`;
  }

  /**
   * Return link for a form
   * @param id id of the form
   */
  formLink(id: number): string {
    return `${this.formsLink()}/${id}`;
  }

  /**
   * List all the forms created
   */
  getAllForms(): Observable<OrderMailFormResponse[]> {
    return this._http.get<any>(this.formsLink())
      .pipe(
        take(1),
        map((res: any): OrderMailFormResponse[] => {
          return res.data.map((formResponse: any): OrderMailFormResponse => {
            return formResponse;
          });
        })
      );
  }

  getForm(id: number): Observable<OrderMailFormResponse> {
    return this._http.get<any>(this.formLink(id))
      .pipe(
        take(1),
        map((res: any): OrderMailFormResponse => {
          return res.data;
        })
      );
  }

  addForm(form: OrderMailForm): Observable<any> {
    let req: any = {
      name: form.title,
      data: JSON.stringify(form)
    };

    return this._http.post<any>(this.formsLink(), req)
      .pipe(take(1));
  }

  editForm(id:number, form: OrderMailForm): Observable<any> {
    let req: any = {
      id: id,
      name: form.title,
      data: JSON.stringify(form)
    };

    return this._http.post<any>(this.formLink(id), req)
      .pipe(take(1));
  }

  deleteForm(id: number): Observable<any> {
    return this._http.delete<any>(this.formLink(id)).pipe(take(1));
  }

  createQuestionInput(initial: FormInput = null): FormGroup {
    let questionInput: FormGroup;

    if(initial) {
      let questionInputTemplate: any = {
        id: this._idGenService.getId(),
        label: initial.label,
        placeholder: initial.placeholder,
        value: initial.value,
        children_form_questions: this._fb.array([])
      };
      
      for(const childQuestion of initial.children_form_questions) {
        questionInputTemplate.children_form_questions.push(
          this.createFormQuestion(true, childQuestion)
        );
      }

      questionInput = this._fb.group(questionInputTemplate);
    }
    else {
      questionInput = this._fb.group({
        id: this._idGenService.getId(),
        label: '',
        placeholder: '',
        value: '',
        children_form_questions: this._fb.array([])
      });
    }

    console.log('question input created: ', questionInput.value);
    return questionInput;
  }

  createFormQuestion(isChild: boolean, initial: OrderMailFormQuestion = null): FormGroup {
    let formQuestion: FormGroup = null;

    if(initial) {
      let formTemplate: any = {
        id: this._idGenService.getId(),
        label: initial.label,
        placeholder: initial.label,
        type: initial.type,
        is_child: isChild,
        inputs: this._fb.array([])
      };

      initial.inputs.forEach((input: FormInput) => {
        formTemplate.inputs.push(this.createQuestionInput(input))
      });

      formQuestion = this._fb.group(formTemplate);
    }
    else {
      formQuestion = this._fb.group({
        id: this._idGenService.getId(),
        label: 'Question label',
        placeholder: '',
        type: 'dropdown',
        is_child: isChild,
        inputs: this._fb.array([])
      });
    }

    console.log('form question created: ', formQuestion.value);
    return formQuestion;
  }

  createOrderMailForm(initial: OrderMailForm = null): FormGroup {
    let mailForm: FormGroup = null;

    if(initial) {
      let mailFormTemp = {
        id: this._idGenService.getId(),
        title: initial.title,
        questions: this._fb.array([])
      };
      
      initial.questions.forEach(question => {
        mailFormTemp.questions.push(this.createFormQuestion(false, question))
      });

      mailForm = this._fb.group(mailFormTemp);
    }
    else {
      mailForm = this._fb.group({
        id: this._idGenService.getId(),
        title: [
          'Form Title',
          [Validators.required]
        ],
        questions: this._fb.array([
          this.createFormQuestion(false)
        ])
      });
    }

    console.log('Mail form created: ', mailForm.value);
    return mailForm;
  }

  createOrderMailFormQuestionEntry(question: OrderMailFormQuestion): FormGroup {
    let mailFormEntry: FormGroup = this._fb.group({
      id: this._idGenService.getId(),
      question: question.label,
      type: question.type,
      label: '',
      input_value: ''
    });

    return mailFormEntry;
  }

  createOrderMailFormEntry(questions: OrderMailFormQuestion[]): FormArray {
    let formEntry: FormArray = this._fb.array([]);

    questions.forEach((question: OrderMailFormQuestion) => {
      formEntry.push(this.createOrderMailFormQuestionEntry(question));
    });

    return formEntry;
  }

  getPantoneColors(): Color[] {
    return PANTONE_COLORS;
  }
}

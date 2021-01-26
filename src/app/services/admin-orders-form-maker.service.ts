import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { IdGeneratorService } from "./id-generator.service";
import { PANTONE_COLORS } from "../../assets/js/pantone-colors";
import { Color } from "../models/Color";
import {
  OrderFormInputConfig,
  OrderFormConfig,
  OrderFormQuestionConfig,
  OrderFormResponse,
  QUESTION_TYPES,
} from "../models/OrderMailForm";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, take } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AdminOrdersFormMakerService {
  componentDict: Object;

  constructor(
    private _fb: FormBuilder,
    private _idGenService: IdGeneratorService,
    private _http: HttpClient
  ) {}

  getQuestionTypes(): SelectItem<string>[] {
    return QUESTION_TYPES;
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
  getAllForms(): Observable<OrderFormResponse[]> {
    return this._http.get<any>(this.formsLink()).pipe(
      take(1),
      map((res: any): OrderFormResponse[] => {
        return res.data.map(
          (formResponse: any): OrderFormResponse => {
            return formResponse;
          }
        );
      })
    );
  }

  getForm(id: number): Observable<OrderFormResponse> {
    return this._http.get<any>(this.formLink(id)).pipe(
      take(1),
      map(
        (res: any): OrderFormResponse => {
          return res.data;
        }
      )
    );
  }

  addForm(form: OrderFormConfig): Observable<any> {
    let req: any = {
      name: form.title,
      data: JSON.stringify(form),
    };

    return this._http.post<any>(this.formsLink(), req).pipe(take(1));
  }

  editForm(id: number, form: OrderFormConfig): Observable<any> {
    let req: any = {
      id: id,
      name: form.title,
      data: JSON.stringify(form),
    };

    return this._http.post<any>(this.formLink(id), req).pipe(take(1));
  }

  deleteForm(id: number): Observable<any> {
    return this._http.delete<any>(this.formLink(id)).pipe(take(1));
  }

  createQuestionInput(initial: OrderFormInputConfig = null): FormGroup {
    let questionInput: FormGroup;

    if (initial) {
      let questionInputTemplate: any = {
        id: this._idGenService.getId(),
        label: initial.label,
        placeholder: initial.placeholder,
        value: initial.value,
        children_form_questions: this._fb.array([]),
      };

      for (const childQuestion of initial.children_form_questions) {
        questionInputTemplate.children_form_questions.push(
          this.createFormQuestion(true, childQuestion)
        );
      }

      questionInput = this._fb.group(questionInputTemplate);
    } else {
      questionInput = this._fb.group({
        id: this._idGenService.getId(),
        label: '',
        placeholder: '',
        value: '',
        children_form_questions: this._fb.array([]),
      });
    }

    return questionInput;
  }

  createFormQuestion(
    isChild: boolean,
    initial: OrderFormQuestionConfig = null
  ): FormGroup {
    let formQuestion: FormGroup = null;

    if (initial) {
      let formTemplate: any = {
        id: this._idGenService.getId(),
        label: initial.label,
        placeholder: initial.label,
        type: initial.type,
        is_child: isChild,
        inputs: this._fb.array([]),
      };

      initial.inputs.forEach((input: OrderFormInputConfig) => {
        formTemplate.inputs.push(this.createQuestionInput(input));
      });

      formQuestion = this._fb.group(formTemplate);
    }
    else {
      formQuestion = this._fb.group({
        id: this._idGenService.getId(),
        label: 'Question label ' + this._idGenService.getId(),
        placeholder: '',
        type: 'dropdown',
        is_child: isChild,
        inputs: this._fb.array([]),
      });
    }

    return formQuestion;
  }

  createOrderForm(initial: OrderFormConfig = null): FormGroup {
    let mailForm: FormGroup = null;

    if (initial) {
      let mailFormTemp = {
        id: this._idGenService.getId(),
        title: initial.title,
        questions: this._fb.array([]),
      };

      initial.questions.forEach((question) => {
        mailFormTemp.questions.push(this.createFormQuestion(false, question));
      });

      mailForm = this._fb.group(mailFormTemp);
    } else {
      mailForm = this._fb.group({
        id: this._idGenService.getId(),
        title: ['Form Title ' + this._idGenService.getId(), [Validators.required]],
        questions: this._fb.array([this.createFormQuestion(false)]),
      });
    }

    return mailForm;
  }

  createOrderFormQuestionEntry(question: OrderFormQuestionConfig): FormGroup {
    let mailFormEntry: FormGroup = this._fb.group({
      id: this._idGenService.getId(),
      question: question.label,
      type: question.type,
      label: '',
      input_value: '',
    });

    return mailFormEntry;
  }

  createOrderMailFormEntry(questions: OrderFormQuestionConfig[]): FormArray {
    let formEntry: FormArray = this._fb.array([]);

    questions.forEach((question: OrderFormQuestionConfig) => {
      formEntry.push(this.createOrderFormQuestionEntry(question));
    });

    return formEntry;
  }

  getPantoneColors(): Color[] {
    return PANTONE_COLORS;
  }
}

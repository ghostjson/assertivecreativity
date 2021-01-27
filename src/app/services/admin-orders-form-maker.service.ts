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

  /**
   * return question types list
   */
  getQuestionTypes(): SelectItem<string>[] {
    return QUESTION_TYPES;
  }

  /**
   * return pantone colors
   */
  getPantoneColors(): Color[] {
    return PANTONE_COLORS;
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

  /**
   * get a form
   * @param id id of the form
   */
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

  /**
   * Add form
   * @param form form object to add
   */
  addForm(form: OrderFormConfig): Observable<any> {
    let req: any = {
      name: form.title,
      data: JSON.stringify(form),
    };

    return this._http.post<any>(this.formsLink(), req).pipe(take(1));
  }

  /**
   * Edit form
   * @param id id of the form to edit
   * @param form form object to edit
   */
  editForm(id: number, form: OrderFormConfig): Observable<any> {
    let req: any = {
      id: id,
      name: form.title,
      data: JSON.stringify(form),
    };

    return this._http.post<any>(this.formLink(id), req).pipe(take(1));
  }

  /**
   * delete the form
   * @param id id of the form
   */
  deleteForm(id: number): Observable<any> {
    return this._http.delete<any>(this.formLink(id)).pipe(take(1));
  }

  /**
   * create formgroup for question input
   * @param initial initial value of the form
   */
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

  /**
   * create the formgroup for form question
   * @param isChild flag for setting question as child question
   * @param initial initial value of the question
   */
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
        inputs: this._fb.array([
          this.createQuestionInput()
        ]),
      });
    }

    return formQuestion;
  }

  /**
   * create order form formgroup
   * @param initial initial value of the order form
   */
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

  /**
   * Create order form question user entry formgroup
   * @param question question form config object
   */
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

  /**
   * Create order form user entry formgroup
   * @param questions question form config object array
   */
  createOrderMailFormEntry(questions: OrderFormQuestionConfig[]): FormArray {
    let formEntry: FormArray = this._fb.array([]);

    questions.forEach((question: OrderFormQuestionConfig) => {
      formEntry.push(this.createOrderFormQuestionEntry(question));
    });

    return formEntry;
  }
}

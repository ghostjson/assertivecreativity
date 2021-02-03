import { Injectable } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
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
  OrderFormSectionConfig,
} from "../models/OrderForm";
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
        return res.data;
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
        id: initial.id ? initial.id : this._idGenService.getId(),
        label: initial.label,
        placeholder: initial.placeholder,
        value: initial.value,
        children_form_questions: this._fb.array([]),
      };

      for (const childQuestion of initial.children_form_questions) {
        questionInputTemplate.children_form_questions.push(
          this.createFormQuestion(true, {}, childQuestion)
        );
      }

      questionInput = this._fb.group(questionInputTemplate);
    } else {
      questionInput = this._fb.group({
        id: this._idGenService.getId(),
        label: "",
        placeholder: "",
        value: "",
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
    properties: {[key: string]: any},
    initial: OrderFormQuestionConfig = null
  ): FormGroup {
    let formQuestion: FormGroup = null;

    if (initial) {
      let formTemplate: any = {
        id: initial.id ? initial.id : this._idGenService.getId(),
        label: initial.label,
        placeholder: initial.placeholder,
        type: initial.type,
        is_child: isChild,
        properties: this._fb.group(initial.properties),
        validators: this._fb.group(initial.validators),
        inputs: this._fb.array([]),
      };

      // add the inputs
      initial.inputs.forEach((input: OrderFormInputConfig) => {
        formTemplate.inputs.push(this.createQuestionInput(input));
      });

      formQuestion = this._fb.group(formTemplate);
    } else {
      formQuestion = this._fb.group({
        id: this._idGenService.getId(),
        label: "Question label " + this._idGenService.getId(),
        placeholder: "",
        type: "dropdown",
        is_child: isChild,
        properties: this._fb.group(properties),
        validators: this._fb.group({
          required: false
        }),
        inputs: this._fb.array([this.createQuestionInput()]),
      });
    }

    return formQuestion;
  }

  /**
   * create a form section formgroup
   * @param initial initial config of the section
   */
  createOrderFormSection(initial: OrderFormSectionConfig = null): FormGroup {
    let formSection: FormGroup = null;

    if(initial) {
      const sectionTemplate = {
        id: initial.id ? initial.id : this._idGenService.getId(),
        title: initial.title,
        required: initial.required,
        questions: this._fb.array([])
      };

      // add questions to the section
      initial.questions.forEach(question => {
        sectionTemplate.questions.push(
          this.createFormQuestion(false, question.properties, question)
        );
      });

      formSection = this._fb.group(sectionTemplate);
    }
    else {
      const sectionTemplate = {
        id: this._idGenService.getId(),
        required: false,
        title: 'Section Title ' + this._idGenService.getId(),
        questions: this._fb.array([this.createFormQuestion(false, {})])
      };

      formSection = this._fb.group(sectionTemplate);
    }

    return formSection;
  }

  /**
   * create order form formgroup
   * @param initial initial value of the order form
   */
  createOrderForm(initial: OrderFormConfig = null): FormGroup {
    let mailForm: FormGroup = null;

    if (initial) {
      const mailFormTemp = {
        id: initial.id ? initial.id : this._idGenService.getId(),
        title: [
          initial.title,
          [Validators.required]
        ],
        sections: this._fb.array([]),
      };

      initial.sections.forEach(section => {
        mailFormTemp.sections.push(this.createOrderFormSection(section));
      });

      mailForm = this._fb.group(mailFormTemp);
    }
    else {
      mailForm = this._fb.group({
        id: this._idGenService.getId(),
        title: [
          "Form Title " + this._idGenService.getId(),
          [Validators.required],
        ],
        sections: this._fb.array([this.createOrderFormSection()]),
      });
    }

    return mailForm;
  }

  /**
   * Create order form question user entry formgroup
   * @param question question form config object
   */
  createOrderFormQuestionEntry(question: OrderFormQuestionConfig): FormGroup {
    const mailFormEntry: FormGroup = this._fb.group({
      id: this._idGenService.getId(),
      question: question.label,
      type: question.type,
      label: "",
      input_value: "",
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

  /**
   * Move formgroup in a formarray
   * @param formArray formarray to sort
   * @param prevIndex previous index of the item
   * @param currentIndex current index of the item
   */
  moveItemInFormArray(formArray: FormArray, prevIndex: number, currentIndex: number): void {
    // let item: AbstractControl = formArray.at(prevIndex);
    // let insertIndex = currentIndex >= prevIndex ? currentIndex + 1 : currentIndex;
    // formArray.insert(insertIndex, item);

    // let removeIndex: number = currentIndex >= prevIndex ? prevIndex : prevIndex + 1;
    // formArray.removeAt(removeIndex);

    let itemPrev: AbstractControl = formArray.at(prevIndex);
    let itemCurr: AbstractControl = formArray.at(currentIndex);
    formArray.setControl(prevIndex, itemCurr);
    formArray.setControl(currentIndex, itemPrev);
  }
}

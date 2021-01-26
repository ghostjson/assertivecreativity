import {
  Component,
  ComponentFactory,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Subject } from "rxjs";
import { delay, takeUntil } from "rxjs/operators";
import {
  FormQuestionEvent,
  OrderFormQuestionConfig,
} from "src/app/models/OrderMailForm";
import { AdminFormsComponentResolverService } from "src/app/services/admin-forms-component-resolver/admin-forms-component-resolver.service";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-question-maker",
  templateUrl: "./admin-forms-question-maker.component.html",
  styleUrls: ["./admin-forms-question-maker.component.scss"],
})
export class AdminFormsQuestionMakerComponent
  implements OnInit, OnDestroy {
  @Input() question: FormGroup;
  @Input() questionIndex: number;
  @Input() data: any;
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>();
  @Output() removeQuestion = new EventEmitter<number>();
  
  @ViewChild("questionContainer", { read: ViewContainerRef, static: true })
  questionContainer: ViewContainerRef;

  questionTypes: SelectItem<string>[];
  componentDestroy: Subject<void>;

  constructor(
    private _formMakerService: AdminOrdersFormMakerService,
    private _formCompResolver: AdminFormsComponentResolverService
  ) {
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this.questionTypes = this._formMakerService.getQuestionTypes();
    this.renderQuestion(this.question.value.type, this.question, this.questionContainer);

    // listen for changes to the question type and render
    this.question.get('type').valueChanges
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((newType: string) => {
        this.renderQuestion(newType, this.question, this.questionContainer);
      });
  }

  ngOnDestroy(): void {
    this.questionContainer.clear();
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   * Render the form question component to the view
   * @param type type of question
   * @param questionFormGroup formgroup to pass to the component
   * @param ref view container ref
   */
  renderQuestion(
    type: string,
    questionFormGroup: FormGroup,
    ref: ViewContainerRef
  ): void {
    ref.clear();
    let componentFactory: ComponentFactory<any> = this._formCompResolver.getComponent(type);
    const component = ref.createComponent(componentFactory);
    
    component.instance.question = questionFormGroup;
    component.instance.childQuestionActive
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((e: FormQuestionEvent) => {
        this.emitActiveChildQuestion(e);
      });
  }

  /**
   * Emit the child question formgroup recevied
   * @param value active child question formgroup
   */
  emitActiveChildQuestion(value: FormQuestionEvent): void {
    console.log('emit from question maker: ', value);
    this.childQuestionActive.emit(value);
  }
  
  /**
   * Emit event for question removal
   * @param index index of the question
   */
  emitRemove(index: number): void {
    this.removeQuestion.emit(index);
  }
}

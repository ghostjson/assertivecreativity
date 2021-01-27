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
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FormQuestionEvent, QuestionType } from "src/app/models/OrderMailForm";
import { AdminFormsComponentResolverService } from "src/app/services/admin-forms-component-resolver/admin-forms-component-resolver.service";
import { AdminOrdersFormMakerService } from "src/app/services/admin-orders-form-maker.service";

@Component({
  selector: "app-admin-forms-question-maker",
  templateUrl: "./admin-forms-question-maker.component.html",
  styleUrls: ["./admin-forms-question-maker.component.scss"]
})
export class AdminFormsQuestionMakerComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() question: FormGroup;
  @Input() questionIndex: number;
  @Input() data: any;
  @Output() childQuestionActive = new EventEmitter<FormQuestionEvent>();
  @Output() removeQuestion = new EventEmitter<number>();

  @ViewChild("questionContainer", { read: ViewContainerRef, static: true })
  questionContainer: ViewContainerRef;

  questionTypes: QuestionType[] = [];
  unsub: Subject<void>;

  constructor(
    private _formMakerService: AdminOrdersFormMakerService,
    private _formCompResolver: AdminFormsComponentResolverService
  ) {
    this.unsub = new Subject<void>();
    this.questionTypes = this._formMakerService.getQuestionTypes();
  }

  ngOnInit(): void {
    this.renderQuestion(
      this.question.value.type,
      this.question,
      this.questionContainer
    );
    // listen for changes to the question type and render
    this.question
      .get("type")
      .valueChanges.pipe(takeUntil(this.unsub))
      .subscribe((newType: string) => {
        console.log('type sub started');
        this.renderQuestion(newType, this.question, this.questionContainer);
      })
      .add(() => {
        console.log('type sub closed');
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.unsub.next();
    if (changes.question) {
      // render the new form
      this.renderQuestion(changes.question.currentValue.value.type, this.question, this.questionContainer);
      // listen for changes to the question type and render
      this.question
        .get("type")
        .valueChanges.pipe(takeUntil(this.unsub))
        .subscribe((newType: string) => {
          console.log('type sub started');
          this.renderQuestion(newType, this.question, this.questionContainer);
        })
        .add(() => {
          console.log('type sub closed');
        });
    }
  }

  ngOnDestroy(): void {
    this.questionContainer.clear();
    this.unsub.next();
    this.unsub.complete();
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
    let componentFactory: ComponentFactory<any> = this._formCompResolver.getComponent(
      type
    );
    const component = ref.createComponent(componentFactory);
    component.instance.data = this.getDataOfQuestion(type);

    component.instance.question = questionFormGroup;
    component.instance.childQuestionActive
      .pipe(takeUntil(this.unsub))
      .subscribe((e: FormQuestionEvent) => {
        console.log('child sub started');
        this.emitActiveChildQuestion(e);
      })
      .add(() => {
        console.log('child sub closed');
      });
  }

  /**
   * Emit the child question formgroup recevied
   * @param value active child question formgroup
   */
  emitActiveChildQuestion(value: FormQuestionEvent): void {
    console.log('emit active child from question maker: ', value);
    this.childQuestionActive.emit(value);
  }

  /**
   * Emit event for question removal
   * @param index index of the question
   */
  emitRemove(index: number): void {
    this.removeQuestion.emit(index);
  }

  /**
   * return data of the question type
   * @param type type of the question
   */
  getDataOfQuestion(type: string): QuestionType {
    let questionType: QuestionType = this.questionTypes.find((question: QuestionType): boolean => {
      return question.value === type;
    });

    return questionType ? questionType.data : null;
  }
}

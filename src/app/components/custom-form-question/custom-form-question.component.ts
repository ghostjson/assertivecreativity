import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormInputEvent,
  OrderFormQuestionConfig,
} from 'src/app/models/OrderForm';
import { CustomFormService } from 'src/app/services/custom-form/custom-form.service';
import { FormComponentResolverService } from 'src/app/services/form-component-resolver/form-component-resolver.service';

@Component({
  selector: 'app-custom-form-question',
  templateUrl: './custom-form-question.component.html',
  styleUrls: ['./custom-form-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFormQuestionComponent implements OnInit, OnDestroy {
  @Input() questionFormGroup: FormGroup;
  @Input() questionConfig: OrderFormQuestionConfig;
  @Input() questionIndex: number;

  @ViewChild('questionsList', { read: ViewContainerRef, static: true })
  questionsList: ViewContainerRef;
  @ViewChild('childrenQuestionsList', { read: ViewContainerRef, static: true })
  childrenQuestionsList: ViewContainerRef;

  componentDestroy: Subject<void>;

  constructor(
    private _formCompResolver: FormComponentResolverService,
    private _compFactResolver: ComponentFactoryResolver,
    private _formService: CustomFormService
  ) {
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this.renderQuestion(
      this.questionConfig,
      this.questionFormGroup,
      this.questionsList,
      this.questionIndex
    );
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   *
   * @param config question config
   * @param formGroup formgroup for the question
   * @param view view conrainer ref to render the question
   * @param questionIndex index of the question
   * @param insertIndex index to insert the question
   */
  renderQuestion(
    config: OrderFormQuestionConfig,
    formGroup: FormGroup,
    view: ViewContainerRef,
    questionIndex: number,
    insertIndex: number = null
  ): ComponentRef<any> {
    const componentFactory = this._formCompResolver.getComponent(config.type);

    const component = view.createComponent<any>(
      this._compFactResolver.resolveComponentFactory(componentFactory),
      insertIndex
    );

    component.instance.questionConfig = config;
    component.instance.questionFormGroup = formGroup;

    if (!config.is_child) {
      component.instance.questionIndex = questionIndex;
      component.instance.onInput
        .pipe(takeUntil(this.componentDestroy))
        .subscribe((event: FormInputEvent) => {
          console.log('emit caught in question: ', event);
          this.renderChildrenQuestions(event.childrenQuestionsConfig);
        });
    }

    return component;
  }

  /**
   * render the children questions
   * @param questionConfigs question configs for the children questions
   */
  renderChildrenQuestions(questionConfigs: OrderFormQuestionConfig[]): void {
    this.childrenQuestionsList.clear();
    if (questionConfigs) {
      questionConfigs.forEach((config, index) => {
        this.renderQuestion(
          config,
          this._formService.createQuestion(config),
          this.childrenQuestionsList,
          index
        );
      });
    }
  }
}

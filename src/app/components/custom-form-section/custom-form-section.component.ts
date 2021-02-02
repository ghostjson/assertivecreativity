import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  OrderFormQuestionConfig,
  OrderFormSectionConfig,
} from 'src/app/models/OrderForm';
import { FormComponentResolverService } from 'src/app/services/form-component-resolver/form-component-resolver.service';

@Component({
  selector: 'app-custom-form-section',
  templateUrl: './custom-form-section.component.html',
  styleUrls: ['./custom-form-section.component.scss'],
})
export class CustomFormSectionComponent implements OnInit {
  @Input() sectionConfig: OrderFormSectionConfig;
  @Input() sectionFormGroup: FormGroup;

  @ViewChild('questionsList', { read: ViewContainerRef, static: true })
  questionsList: ViewContainerRef;

  constructor(
    private _compFactResolver: ComponentFactoryResolver,
    private _formCompResolver: FormComponentResolverService
  ) {}

  ngOnInit(): void {
    this.questionsList.clear();
    this.sectionConfig.questions.forEach((question, questionIndex) => {
      console.log(question.type);
      this.renderQuestion(question, questionIndex);
    });
  }

  questionEntries(): FormArray {
    return <FormArray>this.sectionFormGroup.get('questionEntries');
  }

  renderQuestion(
    config: OrderFormQuestionConfig,
    questionIndex: number,
    insertIndex: number = null
  ): void {
    const componentFactory = this._formCompResolver.getComponent(config.type);

    const component = this.questionsList.createComponent<any>(
      this._compFactResolver.resolveComponentFactory(componentFactory),
      insertIndex
    );

    component.instance.questionConfig = config;
    component.instance.questionFormGroup = this.questionEntries().at(
      questionIndex
    );
  }

  renderChildrenQuestion(
    questionIndex: number,
    questionConfigs: OrderFormQuestionConfig[]
  ): void {}
}

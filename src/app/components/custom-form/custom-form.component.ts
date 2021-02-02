import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CustomFormEntry, OrderFormConfig } from 'src/app/models/OrderForm';
import { CustomFormService } from 'src/app/services/custom-form/custom-form.service';
import { FormComponentResolverService } from 'src/app/services/form-component-resolver/form-component-resolver.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent implements OnInit {
  @Input() formConfig: OrderFormConfig;
  @Input() formReceiver: boolean;
  @Input() initialEntry: CustomFormEntry;

  @ViewChild('questionsList', { static: true, read: ViewContainerRef })
  questionsList: ViewContainerRef;

  formGroup: FormGroup;

  constructor(
    private _formCompResolver: FormComponentResolverService,
    private _compFactResolver: ComponentFactoryResolver,
    private _formService: CustomFormService
  ) {}

  ngOnInit(): void {
    this.formGroup = this._formService.createForm(
      this.formConfig,
      this.initialEntry
    );

    console.log('form config: ', this.formConfig);
    console.log('formgroup created: ', this.formGroup.value);

    this.questionsList.clear();
    this.formConfig.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        console.log(question.type);
        const component = this.questionsList.createComponent<any>(
          this._compFactResolver.resolveComponentFactory(
            this._formCompResolver.getComponent(question.type)
          )
        );

        component.instance.questionConfig = question;
        component.instance.questionFormGroup = this.questionEntries(
          sectionIndex
        ).at(questionIndex);
      });
    });
  }

  sectionEntries(): FormArray {
    return this.formGroup.get('sectionEntries') as FormArray;
  }

  questionEntries(sectionIndex: number): FormArray {
    return this.sectionEntries()
      .at(sectionIndex)
      .get('questionEntries') as FormArray;
  }
}

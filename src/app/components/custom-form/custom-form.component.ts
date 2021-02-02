import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CustomFormEntry, OrderFormConfig } from 'src/app/models/OrderForm';
import { CustomFormService } from 'src/app/services/custom-form/custom-form.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent implements OnInit {
  @Input() formConfig: OrderFormConfig;
  @Input() formReceiver: boolean;
  @Input() initialEntry: CustomFormEntry;

  formGroup: FormGroup;
  activeSection: {
    index: number,
    formGroup: FormGroup
  };
  formProgress: number;

  constructor(private _formService: CustomFormService) {}

  ngOnInit(): void {
    this.formGroup = this._formService.createForm(
      this.formConfig,
      this.initialEntry
    );

    this.activeSection = {
      index: 0,
      formGroup: <FormGroup>this.sectionEntries().at(0)
    };

    console.log('form config: ', this.formConfig);
    console.log('formgroup created: ', this.formGroup.value);
  }

  sectionEntries(): FormArray {
    return this.formGroup.get('sectionEntries') as FormArray;
  }

  questionEntries(sectionIndex: number): FormArray {
    return this.sectionEntries()
      .at(sectionIndex)
      .get('questionEntries') as FormArray;
  }

  nextSection(): void {
    if (this.activeSection.index < (this.formConfig.sections.length - 1)) {
      this.activeSection.index += 1;
      this.activeSection.formGroup = <FormGroup>this.sectionEntries().at(this.activeSection.index);
    } else {
      this.submitForm();
    }
  }

  prevSection(): void {
    if (this.activeSection.index > 0) {
      this.activeSection.index -= 1;
      this.activeSection.formGroup = <FormGroup>this.sectionEntries().at(this.activeSection.index);
    }
  }

  submitForm(): void {
    console.log('form submitted');
  }
}

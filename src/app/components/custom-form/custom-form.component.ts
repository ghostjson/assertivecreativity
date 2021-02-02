import { Component, Input, OnInit } from '@angular/core';
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
    index: number;
    formGroup: FormGroup;
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
      formGroup: <FormGroup>this.sectionEntries().at(0),
    };
    this.updateFormProgress();

    console.log('form config: ', this.formConfig);
    console.log('formgroup created: ', this.formGroup.value);
  }

  /**
   * get section entries
   */
  sectionEntries(): FormArray {
    return this.formGroup.get('sectionEntries') as FormArray;
  }

  /**
   * get the questions of sectionEntry at sectionIndex
   * @param sectionIndex index of the sectionEntry
   */
  questionEntries(sectionIndex: number): FormArray {
    return this.sectionEntries()
      .at(sectionIndex)
      .get('questionEntries') as FormArray;
  }

  /**
   * Go to next section of the form
   */
  nextSection(): void {
    if (this.activeSection.index < (this.formConfig.sections.length - 1)) {
      this.activeSection.index += 1;
      this.activeSection.formGroup = <FormGroup>(
        this.sectionEntries().at(this.activeSection.index)
      );
    } else {
      this.submitForm();
    }
    console.log(this.sectionEntries().value);
    console.log(`${this.activeSection.index} of ${this.formConfig.sections.length - 1}`);
    this.updateFormProgress();
  }

  /**
   * Go to the previous section of the form
   */
  prevSection(): void {
    if (this.activeSection.index > 0) {
      this.activeSection.index -= 1;
      this.activeSection.formGroup = <FormGroup>(
        this.sectionEntries().at(this.activeSection.index)
      );
    }
    console.log(this.sectionEntries().value);
    console.log(`${this.activeSection.index} of ${this.formConfig.sections.length - 1}`);
    this.updateFormProgress();
  }

  /**
   * update the progress bar value
   */
  updateFormProgress(): void {
    this.formProgress = Math.floor(
      ((this.activeSection.index + 1) / (this.formConfig.sections.length)) * 100
    );
  }

  /**
   * Submit the form
   */
  submitForm(): void {
    console.log('form submitted');
  }
}

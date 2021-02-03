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
import { FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormInputEvent,
  OrderFormQuestionConfig,
  OrderFormSectionConfig,
} from 'src/app/models/OrderForm';
import { AdminOrdersFormMakerService } from 'src/app/services/admin-orders-form-maker.service';
import { FormComponentResolverService } from 'src/app/services/form-component-resolver/form-component-resolver.service';

@Component({
  selector: 'app-custom-form-section',
  templateUrl: './custom-form-section.component.html',
  styleUrls: ['./custom-form-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFormSectionComponent implements OnInit {
  @Input() sectionConfig: OrderFormSectionConfig;
  @Input() sectionFormGroup: FormGroup;

  questionComponentRefs: ComponentRef<any>[];

  constructor() {}

  ngOnInit(): void {
  }

  /**
   * return question entries of the section
   */
  questionEntries(): FormArray {
    return <FormArray>this.sectionFormGroup.get('questionEntries');
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionDatePickerComponent } from './custom-form-question-date-picker.component';

describe('CustomFormQuestionDatePickerComponent', () => {
  let component: CustomFormQuestionDatePickerComponent;
  let fixture: ComponentFixture<CustomFormQuestionDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

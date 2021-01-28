import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerDatePickerComponent } from './admin-forms-question-maker-date-picker.component';

describe('AdminFormsQuestionMakerDatePickerComponent', () => {
  let component: AdminFormsQuestionMakerDatePickerComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

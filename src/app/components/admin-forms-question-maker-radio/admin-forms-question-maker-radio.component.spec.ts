import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerRadioComponent } from './admin-forms-question-maker-radio.component';

describe('AdminFormsQuestionMakerRadioComponent', () => {
  let component: AdminFormsQuestionMakerRadioComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerRadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

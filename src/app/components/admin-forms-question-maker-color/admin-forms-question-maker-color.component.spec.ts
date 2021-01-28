import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerColorComponent } from './admin-forms-question-maker-color.component';

describe('OrderMailFormMakerColorComponent', () => {
  let component: AdminFormsQuestionMakerColorComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerColorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

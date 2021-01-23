import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsQuestionMakerQuestionComponent } from './admin-forms-question-maker-question.component';

describe('AdminFormsQuestionMakerQuestionComponent', () => {
  let component: AdminFormsQuestionMakerQuestionComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerChildQuestionsListComponent } from './admin-forms-question-maker-child-questions-list.component';

describe('AdminFormsQuestionMakerChildQuestionsListComponent', () => {
  let component: AdminFormsQuestionMakerChildQuestionsListComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerChildQuestionsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerChildQuestionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerChildQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

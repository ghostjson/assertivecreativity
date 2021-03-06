import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerParagraphComponent } from './admin-forms-question-maker-paragraph.component';

describe('AdminFormsQuestionMakerParagraphComponent', () => {
  let component: AdminFormsQuestionMakerParagraphComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerParagraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

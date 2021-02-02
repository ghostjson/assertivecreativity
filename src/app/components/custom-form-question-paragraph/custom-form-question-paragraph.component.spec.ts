import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionParagraphComponent } from './custom-form-question-paragraph.component';

describe('CustomFormQuestionParagraphComponent', () => {
  let component: CustomFormQuestionParagraphComponent;
  let fixture: ComponentFixture<CustomFormQuestionParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionParagraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

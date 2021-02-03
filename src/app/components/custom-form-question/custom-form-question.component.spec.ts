import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionComponent } from './custom-form-question.component';

describe('CustomFormQuestionComponent', () => {
  let component: CustomFormQuestionComponent;
  let fixture: ComponentFixture<CustomFormQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

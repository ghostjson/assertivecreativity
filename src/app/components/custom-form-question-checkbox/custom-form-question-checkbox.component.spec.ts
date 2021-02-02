import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionCheckboxComponent } from './custom-form-question-checkbox.component';

describe('CustomFormQuestionCheckboxComponent', () => {
  let component: CustomFormQuestionCheckboxComponent;
  let fixture: ComponentFixture<CustomFormQuestionCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

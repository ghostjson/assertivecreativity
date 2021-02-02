import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionColorComponent } from './custom-form-question-color.component';

describe('CustomFormQuestionColorComponent', () => {
  let component: CustomFormQuestionColorComponent;
  let fixture: ComponentFixture<CustomFormQuestionColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

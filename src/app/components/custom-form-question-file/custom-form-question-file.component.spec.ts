import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionFileComponent } from './custom-form-question-file.component';

describe('CustomFormQuestionFileComponent', () => {
  let component: CustomFormQuestionFileComponent;
  let fixture: ComponentFixture<CustomFormQuestionFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

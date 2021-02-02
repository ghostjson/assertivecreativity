import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionRadioComponent } from './custom-form-question-radio.component';

describe('CustomFormQuestionRadioComponent', () => {
  let component: CustomFormQuestionRadioComponent;
  let fixture: ComponentFixture<CustomFormQuestionRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

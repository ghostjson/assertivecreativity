import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormQuestionDropdownComponent } from './custom-form-question-dropdown.component';

describe('CustomFormQuestionDropdownComponent', () => {
  let component: CustomFormQuestionDropdownComponent;
  let fixture: ComponentFixture<CustomFormQuestionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormQuestionDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormQuestionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerDropdownComponent } from './admin-forms-question-maker-dropdown.component';

describe('OrderMailFormMakerDropdownComponent', () => {
  let component: AdminFormsQuestionMakerDropdownComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

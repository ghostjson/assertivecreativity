import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsQuestionMakerDropdownComponent } from './admin-forms-question-maker-dropdown.component';

describe('OrderMailFormMakerDropdownComponent', () => {
  let component: AdminFormsQuestionMakerDropdownComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerDropdownComponent>;

  beforeEach(async(() => {
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

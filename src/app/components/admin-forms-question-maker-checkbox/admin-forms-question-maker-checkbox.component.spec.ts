import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsQuestionMakerCheckboxComponent } from './admin-forms-question-maker-checkbox.component';

describe('AdminFormsQuestionMakerCheckboxComponent', () => {
  let component: AdminFormsQuestionMakerCheckboxComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

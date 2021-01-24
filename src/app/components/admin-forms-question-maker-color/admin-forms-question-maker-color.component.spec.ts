import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsQuestionMakerColorComponent } from './admin-forms-question-maker-color.component';

describe('OrderMailFormMakerColorComponent', () => {
  let component: AdminFormsQuestionMakerColorComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormsQuestionMakerComponent } from './admin-forms-question-maker.component';

describe('AdminFormsQuestionMakerComponent', () => {
  let component: AdminFormsQuestionMakerComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsQuestionMakerFileComponent } from './admin-forms-question-maker-file.component';

describe('AdminFormsQuestionMakerFileComponent', () => {
  let component: AdminFormsQuestionMakerFileComponent;
  let fixture: ComponentFixture<AdminFormsQuestionMakerFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormsQuestionMakerFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsQuestionMakerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

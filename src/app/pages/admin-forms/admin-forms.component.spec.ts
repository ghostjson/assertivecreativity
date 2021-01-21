import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsComponent } from './admin-forms.component';

describe('AdminFormsComponent', () => {
  let component: AdminFormsComponent;
  let fixture: ComponentFixture<AdminFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

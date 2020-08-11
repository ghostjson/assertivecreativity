import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomFormComponent } from './admin-custom-form.component';

describe('AdminCustomFormComponent', () => {
  let component: AdminCustomFormComponent;
  let fixture: ComponentFixture<AdminCustomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

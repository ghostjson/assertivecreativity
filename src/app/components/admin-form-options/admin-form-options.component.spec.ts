import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFormOptionsComponent } from './admin-form-options.component';

describe('AdminFormOptionsComponent', () => {
  let component: AdminFormOptionsComponent;
  let fixture: ComponentFixture<AdminFormOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

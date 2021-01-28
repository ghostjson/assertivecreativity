import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminStatusCardComponent } from './admin-status-card.component';

describe('AdminStatusCardComponent', () => {
  let component: AdminStatusCardComponent;
  let fixture: ComponentFixture<AdminStatusCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

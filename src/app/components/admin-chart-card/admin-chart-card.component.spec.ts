import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminChartCardComponent } from './admin-chart-card.component';

describe('VendorAdminChartCardComponent', () => {
  let component: AdminChartCardComponent;
  let fixture: ComponentFixture<AdminChartCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

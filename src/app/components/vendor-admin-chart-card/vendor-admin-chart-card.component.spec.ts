import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminChartCardComponent } from './vendor-admin-chart-card.component';

describe('VendorAdminChartCardComponent', () => {
  let component: VendorAdminChartCardComponent;
  let fixture: ComponentFixture<VendorAdminChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminChartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

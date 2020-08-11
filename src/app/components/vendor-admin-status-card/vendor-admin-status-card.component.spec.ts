import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminStatusCardComponent } from './vendor-admin-status-card.component';

describe('VendorAdminStatusCardComponent', () => {
  let component: VendorAdminStatusCardComponent;
  let fixture: ComponentFixture<VendorAdminStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminHeaderComponent } from './vendor-admin-header.component';

describe('VendorAdminHeaderComponent', () => {
  let component: VendorAdminHeaderComponent;
  let fixture: ComponentFixture<VendorAdminHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

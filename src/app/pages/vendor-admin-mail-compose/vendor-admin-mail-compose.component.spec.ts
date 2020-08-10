import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminMailComposeComponent } from './vendor-admin-mail-compose.component';

describe('VendorAdminMailComposeComponent', () => {
  let component: VendorAdminMailComposeComponent;
  let fixture: ComponentFixture<VendorAdminMailComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminMailComposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminMailComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

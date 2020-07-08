import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminMailSidebarComponent } from './vendor-admin-mail-sidebar.component';

describe('VendorAdminMailSidebarComponent', () => {
  let component: VendorAdminMailSidebarComponent;
  let fixture: ComponentFixture<VendorAdminMailSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminMailSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminMailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

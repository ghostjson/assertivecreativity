import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminMailComponent } from './vendor-admin-mail.component';

describe('VendorAdminMailComponent', () => {
  let component: VendorAdminMailComponent;
  let fixture: ComponentFixture<VendorAdminMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

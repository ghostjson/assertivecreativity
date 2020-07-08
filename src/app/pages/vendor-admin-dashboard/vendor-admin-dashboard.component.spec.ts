import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminComponent } from './vendor-admin.component';

describe('VendorAdminComponent', () => {
  let component: VendorAdminComponent;
  let fixture: ComponentFixture<VendorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

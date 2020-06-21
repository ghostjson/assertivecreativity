import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductDetailsFormComponent } from './vendor-admin-product-details-form.component';

describe('VendorAdminProductDetailsFormComponent', () => {
  let component: VendorAdminProductDetailsFormComponent;
  let fixture: ComponentFixture<VendorAdminProductDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

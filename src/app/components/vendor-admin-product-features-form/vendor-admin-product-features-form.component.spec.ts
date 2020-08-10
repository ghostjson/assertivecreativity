import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductFeaturesFormComponent } from './vendor-admin-product-features-form.component';

describe('VendorAdminProductFeaturesFormComponent', () => {
  let component: VendorAdminProductFeaturesFormComponent;
  let fixture: ComponentFixture<VendorAdminProductFeaturesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductFeaturesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductFeaturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

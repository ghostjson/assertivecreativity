import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductColorChooserComponent } from './vendor-admin-product-color-chooser.component';

describe('VendorAdminProductColorChooserComponent', () => {
  let component: VendorAdminProductColorChooserComponent;
  let fixture: ComponentFixture<VendorAdminProductColorChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductColorChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductColorChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

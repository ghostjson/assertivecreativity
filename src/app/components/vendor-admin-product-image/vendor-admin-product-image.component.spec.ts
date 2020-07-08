import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductImageComponent } from './vendor-admin-product-image.component';

describe('VendorAdminProductImageComponent', () => {
  let component: VendorAdminProductImageComponent;
  let fixture: ComponentFixture<VendorAdminProductImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

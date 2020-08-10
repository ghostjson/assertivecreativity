import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductComponent } from './vendor-admin-product.component';

describe('VendorAdminProductComponent', () => {
  let component: VendorAdminProductComponent;
  let fixture: ComponentFixture<VendorAdminProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

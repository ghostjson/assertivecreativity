import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminAddProductComponent } from './vendor-admin-add-product.component';

describe('VendorAdminAddProductComponent', () => {
  let component: VendorAdminAddProductComponent;
  let fixture: ComponentFixture<VendorAdminAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminAddProductFormComponent } from './vendor-admin-add-product-form.component';

describe('VendorAdminAddProductFormComponent', () => {
  let component: VendorAdminAddProductFormComponent;
  let fixture: ComponentFixture<VendorAdminAddProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminAddProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminAddProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

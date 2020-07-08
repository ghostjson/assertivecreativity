import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductsComponent } from './vendor-admin-products.component';

describe('VendorAdminProductsComponent', () => {
  let component: VendorAdminProductsComponent;
  let fixture: ComponentFixture<VendorAdminProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

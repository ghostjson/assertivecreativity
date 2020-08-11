import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminProductsListComponent } from './vendor-admin-products-list.component';

describe('VendorAdminProductsListComponent', () => {
  let component: VendorAdminProductsListComponent;
  let fixture: ComponentFixture<VendorAdminProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

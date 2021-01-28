import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminAddProductComponent } from './admin-add-product.component';

describe('VendorAdminAddProductComponent', () => {
  let component: AdminAddProductComponent;
  let fixture: ComponentFixture<AdminAddProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

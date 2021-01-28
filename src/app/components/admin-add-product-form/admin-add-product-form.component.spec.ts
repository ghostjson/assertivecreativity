import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminAddProductFormComponent } from './admin-add-product-form.component';

describe('VendorAdminAddProductFormComponent', () => {
  let component: AdminAddProductFormComponent;
  let fixture: ComponentFixture<AdminAddProductFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

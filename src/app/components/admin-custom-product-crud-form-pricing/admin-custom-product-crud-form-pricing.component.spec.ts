import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormPricingComponent } from './admin-custom-product-crud-form-pricing.component';

describe('AdminCustomProductCrudFormPricingComponent', () => {
  let component: AdminCustomProductCrudFormPricingComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

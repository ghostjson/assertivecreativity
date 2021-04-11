import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductVariantCrudFormBasicDetailsComponent } from './admin-product-variant-crud-form-basic-details.component';

describe('AdminProductVariantCrudFormBasicDetailsComponent', () => {
  let component: AdminProductVariantCrudFormBasicDetailsComponent;
  let fixture: ComponentFixture<AdminProductVariantCrudFormBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductVariantCrudFormBasicDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminProductVariantCrudFormBasicDetailsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

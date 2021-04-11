import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductVariantCrudFormComponent } from './admin-product-variant-crud-form.component';

describe('AdminProductVariantCrudFormComponent', () => {
  let component: AdminProductVariantCrudFormComponent;
  let fixture: ComponentFixture<AdminProductVariantCrudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductVariantCrudFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductVariantCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

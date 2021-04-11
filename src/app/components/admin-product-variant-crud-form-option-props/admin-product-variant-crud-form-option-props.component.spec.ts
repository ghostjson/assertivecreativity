import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductVariantCrudFormOptionPropsComponent } from './admin-product-variant-crud-form-option-props.component';

describe('AdminProductVariantCrudFormOptionPropsComponent', () => {
  let component: AdminProductVariantCrudFormOptionPropsComponent;
  let fixture: ComponentFixture<AdminProductVariantCrudFormOptionPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductVariantCrudFormOptionPropsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminProductVariantCrudFormOptionPropsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

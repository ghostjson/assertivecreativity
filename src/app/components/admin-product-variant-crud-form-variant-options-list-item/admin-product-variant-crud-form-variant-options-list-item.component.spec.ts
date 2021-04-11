import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductVariantCrudFormVariantOptionsListItemComponent } from './admin-product-variant-crud-form-variant-options-list-item.component';

describe('AdminProductVariantCrudFormVariantOptionsListItemComponent', () => {
  let component: AdminProductVariantCrudFormVariantOptionsListItemComponent;
  let fixture: ComponentFixture<AdminProductVariantCrudFormVariantOptionsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminProductVariantCrudFormVariantOptionsListItemComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminProductVariantCrudFormVariantOptionsListItemComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

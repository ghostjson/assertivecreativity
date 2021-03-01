import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormProductImageComponent } from './admin-custom-product-crud-form-product-image.component';

describe('AdminCustomProductCrudFormProductImageComponent', () => {
  let component: AdminCustomProductCrudFormProductImageComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormProductImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

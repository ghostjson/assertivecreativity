import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormVariantsTabComponent } from './admin-custom-product-crud-form-variants-tab.component';

describe('AdminCustomProductCrudFormVariantsTabComponent', () => {
  let component: AdminCustomProductCrudFormVariantsTabComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormVariantsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormVariantsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormVariantsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

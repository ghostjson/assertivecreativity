import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormOrderPropertiesComponent } from './admin-custom-product-crud-form-order-properties.component';

describe('AdminCustomProductCrudFormOrderPropertiesComponent', () => {
  let component: AdminCustomProductCrudFormOrderPropertiesComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormOrderPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormOrderPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormOrderPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

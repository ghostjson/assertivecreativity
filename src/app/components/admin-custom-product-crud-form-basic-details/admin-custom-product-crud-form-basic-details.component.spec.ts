import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormBasicDetailsComponent } from './admin-custom-product-crud-form-basic-details.component';

describe('AdminCustomProductCrudFormBasicDetailsComponent', () => {
  let component: AdminCustomProductCrudFormBasicDetailsComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

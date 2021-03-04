import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAttrCrudFormBasicDetailsComponent } from './admin-product-attr-crud-form-basic-details.component';

describe('AdminProductAttrCrudFormBasicDetailsComponent', () => {
  let component: AdminProductAttrCrudFormBasicDetailsComponent;
  let fixture: ComponentFixture<AdminProductAttrCrudFormBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAttrCrudFormBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAttrCrudFormBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

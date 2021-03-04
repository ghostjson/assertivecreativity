import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAttrCrudFormComponent } from './admin-product-attr-crud-form.component';

describe('AdminProductAttrCrudFormComponent', () => {
  let component: AdminProductAttrCrudFormComponent;
  let fixture: ComponentFixture<AdminProductAttrCrudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAttrCrudFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAttrCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

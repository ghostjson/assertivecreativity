import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAttrCrudFormAttrOptionsListItemComponent } from './admin-product-attr-crud-form-attr-options-list-item.component';

describe('AdminProductAttrCrudFormAttrOptionsListItemComponent', () => {
  let component: AdminProductAttrCrudFormAttrOptionsListItemComponent;
  let fixture: ComponentFixture<AdminProductAttrCrudFormAttrOptionsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAttrCrudFormAttrOptionsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAttrCrudFormAttrOptionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

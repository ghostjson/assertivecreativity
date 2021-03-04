import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAttrCrudFormOptionPropsComponent } from './admin-product-attr-crud-form-option-props.component';

describe('AdminProductAttrCrudFormOptionPropsComponent', () => {
  let component: AdminProductAttrCrudFormOptionPropsComponent;
  let fixture: ComponentFixture<AdminProductAttrCrudFormOptionPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAttrCrudFormOptionPropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAttrCrudFormOptionPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

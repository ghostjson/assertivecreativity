import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormComponent } from './admin-custom-product-crud-form.component';

describe('AdminCustomProductCrudFormComponent', () => {
  let component: AdminCustomProductCrudFormComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

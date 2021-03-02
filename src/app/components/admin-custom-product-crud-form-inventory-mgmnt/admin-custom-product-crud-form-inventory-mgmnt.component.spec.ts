import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudFormInventoryMgmntComponent } from './admin-custom-product-crud-form-inventory-mgmnt.component';

describe('AdminCustomProductCrudFormInventoryMgmntComponent', () => {
  let component: AdminCustomProductCrudFormInventoryMgmntComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudFormInventoryMgmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudFormInventoryMgmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudFormInventoryMgmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

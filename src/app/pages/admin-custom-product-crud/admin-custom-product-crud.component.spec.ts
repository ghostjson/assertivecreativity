import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomProductCrudComponent } from './admin-custom-product-crud.component';

describe('AdminCustomProductCrudComponent', () => {
  let component: AdminCustomProductCrudComponent;
  let fixture: ComponentFixture<AdminCustomProductCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomProductCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomProductCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

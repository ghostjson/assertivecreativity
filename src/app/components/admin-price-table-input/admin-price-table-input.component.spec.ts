import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminPriceTableInputComponent } from './admin-price-table-input.component';

describe('AdminPriceTableInputComponent', () => {
  let component: AdminPriceTableInputComponent;
  let fixture: ComponentFixture<AdminPriceTableInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPriceTableInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPriceTableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

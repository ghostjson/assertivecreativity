import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderMailFormDropdownComponent } from './order-mail-form-dropdown.component';

describe('OrderMailFormDropdownComponent', () => {
  let component: OrderMailFormDropdownComponent;
  let fixture: ComponentFixture<OrderMailFormDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

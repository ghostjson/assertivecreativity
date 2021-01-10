import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormDatePickerComponent } from './order-mail-form-date-picker.component';

describe('OrderMailFormDatePickerComponent', () => {
  let component: OrderMailFormDatePickerComponent;
  let fixture: ComponentFixture<OrderMailFormDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

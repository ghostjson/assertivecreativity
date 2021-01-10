import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormMakerDatePickerComponent } from './order-mail-form-maker-date-picker.component';

describe('OrderMailFormMakerDatePickerComponent', () => {
  let component: OrderMailFormMakerDatePickerComponent;
  let fixture: ComponentFixture<OrderMailFormMakerDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormMakerDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormMakerDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

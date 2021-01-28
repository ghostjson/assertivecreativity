import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderMailFormRadioComponent } from './order-mail-form-radio.component';

describe('OrderMailFormRadioComponent', () => {
  let component: OrderMailFormRadioComponent;
  let fixture: ComponentFixture<OrderMailFormRadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

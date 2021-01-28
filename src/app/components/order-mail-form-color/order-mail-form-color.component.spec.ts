import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderMailFormColorComponent } from './order-mail-form-color.component';

describe('OrderMailFormColorComponent', () => {
  let component: OrderMailFormColorComponent;
  let fixture: ComponentFixture<OrderMailFormColorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

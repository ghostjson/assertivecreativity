import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderSummaryTableComponent } from './order-summary-table.component';

describe('OrderSummaryTableComponent', () => {
  let component: OrderSummaryTableComponent;
  let fixture: ComponentFixture<OrderSummaryTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

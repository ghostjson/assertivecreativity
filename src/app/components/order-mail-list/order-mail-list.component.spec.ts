import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderMailListComponent } from './order-mail-list.component';

describe('OrderMailListComponent', () => {
  let component: OrderMailListComponent;
  let fixture: ComponentFixture<OrderMailListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

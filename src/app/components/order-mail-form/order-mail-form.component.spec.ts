import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderMailFormComponent } from './order-mail-form.component';

describe('OrderMailFormComponent', () => {
  let component: OrderMailFormComponent;
  let fixture: ComponentFixture<OrderMailFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

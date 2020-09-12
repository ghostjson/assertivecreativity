import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailListComponent } from './order-mail-list.component';

describe('OrderMailListComponent', () => {
  let component: OrderMailListComponent;
  let fixture: ComponentFixture<OrderMailListComponent>;

  beforeEach(async(() => {
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

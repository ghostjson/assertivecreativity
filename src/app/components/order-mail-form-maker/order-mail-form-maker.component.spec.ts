import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormMakerComponent } from './order-mail-form-maker.component';

describe('OrderMailFormMakerComponent', () => {
  let component: OrderMailFormMakerComponent;
  let fixture: ComponentFixture<OrderMailFormMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

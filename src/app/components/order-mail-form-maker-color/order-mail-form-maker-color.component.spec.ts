import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormMakerColorComponent } from './order-mail-form-maker-color.component';

describe('OrderMailFormMakerColorComponent', () => {
  let component: OrderMailFormMakerColorComponent;
  let fixture: ComponentFixture<OrderMailFormMakerColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormMakerColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormMakerColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

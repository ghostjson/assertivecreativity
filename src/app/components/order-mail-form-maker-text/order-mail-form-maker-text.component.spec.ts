import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormMakerTextComponent } from './order-mail-form-maker-text.component';

describe('OrderMailFormMakerTextComponent', () => {
  let component: OrderMailFormMakerTextComponent;
  let fixture: ComponentFixture<OrderMailFormMakerTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormMakerTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormMakerTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

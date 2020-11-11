import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormMakerRadioComponent } from './order-mail-form-maker-radio.component';

describe('OrderMailFormMakerRadioComponent', () => {
  let component: OrderMailFormMakerRadioComponent;
  let fixture: ComponentFixture<OrderMailFormMakerRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormMakerRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormMakerRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

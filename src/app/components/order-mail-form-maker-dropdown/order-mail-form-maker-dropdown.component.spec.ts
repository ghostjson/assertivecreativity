import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMailFormMakerDropdownComponent } from './order-mail-form-maker-dropdown.component';

describe('OrderMailFormMakerDropdownComponent', () => {
  let component: OrderMailFormMakerDropdownComponent;
  let fixture: ComponentFixture<OrderMailFormMakerDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMailFormMakerDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMailFormMakerDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

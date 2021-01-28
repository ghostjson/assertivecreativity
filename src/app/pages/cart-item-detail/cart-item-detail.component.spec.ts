import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartItemDetailComponent } from './cart-item-detail.component';

describe('CartItemDetailComponent', () => {
  let component: CartItemDetailComponent;
  let fixture: ComponentFixture<CartItemDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

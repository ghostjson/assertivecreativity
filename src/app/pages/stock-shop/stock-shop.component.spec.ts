import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockShopComponent } from './stock-shop.component';

describe('ShopStockComponent', () => {
  let component: StockShopComponent;
  let fixture: ComponentFixture<StockShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

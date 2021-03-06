import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockProductDetailComponent } from './stock-product-detail.component';

describe('StockProductDetailComponent', () => {
  let component: StockProductDetailComponent;
  let fixture: ComponentFixture<StockProductDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

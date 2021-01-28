import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductSummaryCardComponent } from './product-summary-card.component';

describe('ProductSummaryCardComponent', () => {
  let component: ProductSummaryCardComponent;
  let fixture: ComponentFixture<ProductSummaryCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

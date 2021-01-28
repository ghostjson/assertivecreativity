import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsRadioBtnComponent } from './product-options-radio-btn.component';

describe('ProductOptionsRadioBtnComponent', () => {
  let component: ProductOptionsRadioBtnComponent;
  let fixture: ComponentFixture<ProductOptionsRadioBtnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsRadioBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsRadioBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

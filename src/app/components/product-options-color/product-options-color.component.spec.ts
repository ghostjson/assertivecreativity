import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsColorComponent } from './product-options-color.component';

describe('ProductOptionsColorComponent', () => {
  let component: ProductOptionsColorComponent;
  let fixture: ComponentFixture<ProductOptionsColorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

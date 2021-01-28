import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsComponent } from './product-options.component';

describe('ProductOptionsComponent', () => {
  let component: ProductOptionsComponent;
  let fixture: ComponentFixture<ProductOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionsComponent } from './product-options.component';

describe('ProductOptionsComponent', () => {
  let component: ProductOptionsComponent;
  let fixture: ComponentFixture<ProductOptionsComponent>;

  beforeEach(async(() => {
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

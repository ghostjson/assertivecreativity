import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsDropdownComponent } from './product-options-dropdown.component';

describe('ProductOptionsDropdownComponent', () => {
  let component: ProductOptionsDropdownComponent;
  let fixture: ComponentFixture<ProductOptionsDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomProductDetailComponent } from './custom-product-detail.component';

describe('ProductDetailComponent', () => {
  let component: CustomProductDetailComponent;
  let fixture: ComponentFixture<CustomProductDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

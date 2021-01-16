import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductDetailComponent } from './custom-product-detail.component';

describe('ProductDetailComponent', () => {
  let component: CustomProductDetailComponent;
  let fixture: ComponentFixture<CustomProductDetailComponent>;

  beforeEach(async(() => {
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

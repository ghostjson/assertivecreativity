import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeaturedProductSliderComponent } from './featured-product-slider.component';

describe('FeaturedProductSliderComponent', () => {
  let component: FeaturedProductSliderComponent;
  let fixture: ComponentFixture<FeaturedProductSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProductSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

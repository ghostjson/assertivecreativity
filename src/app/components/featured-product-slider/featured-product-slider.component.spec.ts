import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductSliderComponent } from './featured-product-slider.component';

describe('FeaturedProductSliderComponent', () => {
  let component: FeaturedProductSliderComponent;
  let fixture: ComponentFixture<FeaturedProductSliderComponent>;

  beforeEach(async(() => {
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

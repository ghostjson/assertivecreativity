import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeaturedProductComponent } from './featured-product.component';

describe('FeaturedProductComponent', () => {
  let component: FeaturedProductComponent;
  let fixture: ComponentFixture<FeaturedProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

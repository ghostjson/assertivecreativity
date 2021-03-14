import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductDetailComponent } from './custom-product-detail.component';

describe('CustomProductDetailComponent', () => {
  let component: CustomProductDetailComponent;
  let fixture: ComponentFixture<CustomProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

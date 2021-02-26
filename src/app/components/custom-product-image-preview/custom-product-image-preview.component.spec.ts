import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductImagePreviewComponent } from './custom-product-image-preview.component';

describe('CustomProductImagePreviewComponent', () => {
  let component: CustomProductImagePreviewComponent;
  let fixture: ComponentFixture<CustomProductImagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProductImagePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

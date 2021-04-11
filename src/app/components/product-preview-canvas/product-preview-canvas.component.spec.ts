import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreviewCanvasComponent } from './product-preview-canvas.component';

describe('ProductPreviewCanvasComponent', () => {
  let component: ProductPreviewCanvasComponent;
  let fixture: ComponentFixture<ProductPreviewCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPreviewCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPreviewCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

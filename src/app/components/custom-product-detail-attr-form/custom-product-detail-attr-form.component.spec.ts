import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductDetailAttrFormComponent } from './custom-product-detail-attr-form.component';

describe('CustomProductDetailAttrFormComponent', () => {
  let component: CustomProductDetailAttrFormComponent;
  let fixture: ComponentFixture<CustomProductDetailAttrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProductDetailAttrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductDetailAttrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

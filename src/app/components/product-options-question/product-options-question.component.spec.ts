import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsQuestionComponent } from './product-options-question.component';

describe('ProductOptionsQuestionComponent', () => {
  let component: ProductOptionsQuestionComponent;
  let fixture: ComponentFixture<ProductOptionsQuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

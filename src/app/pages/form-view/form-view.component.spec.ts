import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormViewComponent } from './form-view.component';

describe('FormViewComponent', () => {
  let component: FormViewComponent;
  let fixture: ComponentFixture<FormViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

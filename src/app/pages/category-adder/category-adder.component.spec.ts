import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdderComponent } from './category-adder.component';

describe('CategoryAdderComponent', () => {
  let component: CategoryAdderComponent;
  let fixture: ComponentFixture<CategoryAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

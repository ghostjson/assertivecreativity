import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCategoryAdderComponent } from './admin-category-adder.component';

describe('CategoryAdderComponent', () => {
  let component: AdminCategoryAdderComponent;
  let fixture: ComponentFixture<AdminCategoryAdderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

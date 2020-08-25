import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryAdderComponent } from './admin-category-adder.component';

describe('CategoryAdderComponent', () => {
  let component: AdminCategoryAdderComponent;
  let fixture: ComponentFixture<AdminCategoryAdderComponent>;

  beforeEach(async(() => {
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

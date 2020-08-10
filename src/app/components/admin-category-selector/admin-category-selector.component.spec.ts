import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorySelectorComponent } from './admin-category-selector.component';

describe('AdminCategorySelectorComponent', () => {
  let component: AdminCategorySelectorComponent;
  let fixture: ComponentFixture<AdminCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

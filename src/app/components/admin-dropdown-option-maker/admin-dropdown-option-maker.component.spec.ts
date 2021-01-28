import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDropdownOptionMakerComponent } from './admin-dropdown-option-maker.component';

describe('AdminDropdownOptionMakerComponent', () => {
  let component: AdminDropdownOptionMakerComponent;
  let fixture: ComponentFixture<AdminDropdownOptionMakerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDropdownOptionMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDropdownOptionMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

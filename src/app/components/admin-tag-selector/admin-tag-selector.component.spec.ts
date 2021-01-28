import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminTagSelectorComponent } from './admin-tag-selector.component';

describe('AdminTagSelectorComponent', () => {
  let component: AdminTagSelectorComponent;
  let fixture: ComponentFixture<AdminTagSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTagSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

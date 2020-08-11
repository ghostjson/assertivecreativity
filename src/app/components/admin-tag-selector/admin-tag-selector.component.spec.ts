import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagSelectorComponent } from './admin-tag-selector.component';

describe('AdminTagSelectorComponent', () => {
  let component: AdminTagSelectorComponent;
  let fixture: ComponentFixture<AdminTagSelectorComponent>;

  beforeEach(async(() => {
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

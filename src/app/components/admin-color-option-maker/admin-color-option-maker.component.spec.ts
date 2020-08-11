import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColorOptionMakerComponent } from './admin-color-option-maker.component';

describe('AdminColorOptionMakerComponent', () => {
  let component: AdminColorOptionMakerComponent;
  let fixture: ComponentFixture<AdminColorOptionMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminColorOptionMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminColorOptionMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

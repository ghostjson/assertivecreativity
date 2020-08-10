import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextOptionMakerComponent } from './admin-text-option-maker.component';

describe('AdminTextOptionMakerComponent', () => {
  let component: AdminTextOptionMakerComponent;
  let fixture: ComponentFixture<AdminTextOptionMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTextOptionMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTextOptionMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

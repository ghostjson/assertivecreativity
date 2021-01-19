import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormsMakerComponent } from './admin-forms-maker.component';

describe('AdminFormsMakerComponent', () => {
  let component: AdminFormsMakerComponent;
  let fixture: ComponentFixture<AdminFormsMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormsMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormsMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

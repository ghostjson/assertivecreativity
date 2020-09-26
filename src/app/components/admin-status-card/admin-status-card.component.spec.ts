import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusCardComponent } from './admin-status-card.component';

describe('AdminStatusCardComponent', () => {
  let component: AdminStatusCardComponent;
  let fixture: ComponentFixture<AdminStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

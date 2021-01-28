import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminTagAdderComponent } from './admin-tag-adder.component';

describe('AdminTagAdderComponent', () => {
  let component: AdminTagAdderComponent;
  let fixture: ComponentFixture<AdminTagAdderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTagAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

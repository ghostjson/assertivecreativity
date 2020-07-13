import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMailComponent } from './read-mail.component';

describe('DisplayMailComponent', () => {
  let component: DisplayMailComponent;
  let fixture: ComponentFixture<DisplayMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

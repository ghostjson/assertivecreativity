import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminRadiobtnOptionMakerComponent } from './admin-radiobtn-option-maker.component';

describe('AdminRadiobtnOptionMakerComponent', () => {
  let component: AdminRadiobtnOptionMakerComponent;
  let fixture: ComponentFixture<AdminRadiobtnOptionMakerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRadiobtnOptionMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRadiobtnOptionMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainBannerComponent } from './main-banner.component';

describe('MainBannerComponent', () => {
  let component: MainBannerComponent;
  let fixture: ComponentFixture<MainBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

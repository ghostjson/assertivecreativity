import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaManagerComponent } from './admin-media-manager.component';

describe('AdminMediaManagerComponent', () => {
  let component: AdminMediaManagerComponent;
  let fixture: ComponentFixture<AdminMediaManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMediaManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

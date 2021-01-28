import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminProductEditComponent } from './admin-product-edit.component';

describe('AdminProductEditComponent', () => {
  let component: AdminProductEditComponent;
  let fixture: ComponentFixture<AdminProductEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

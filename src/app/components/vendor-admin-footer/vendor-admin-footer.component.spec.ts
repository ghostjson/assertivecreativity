import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminFooterComponent } from './vendor-admin-footer.component';

describe('VendorAdminFooterComponent', () => {
  let component: VendorAdminFooterComponent;
  let fixture: ComponentFixture<VendorAdminFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

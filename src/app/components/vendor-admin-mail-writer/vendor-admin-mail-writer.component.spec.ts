import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdminMailWriterComponent } from './vendor-admin-mail-writer.component';

describe('VendorAdminMailWriterComponent', () => {
  let component: VendorAdminMailWriterComponent;
  let fixture: ComponentFixture<VendorAdminMailWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminMailWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdminMailWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VendorAdminDashboardService } from './vendor-admin-dashboard.service';

describe('VendorAdminDashboardService', () => {
  let service: VendorAdminDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorAdminDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

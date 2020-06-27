import { TestBed } from '@angular/core/testing';

import { VendorAdminProductService } from './vendor-admin-product.service';

describe('VendorAdminProductService', () => {
  let service: VendorAdminProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorAdminProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

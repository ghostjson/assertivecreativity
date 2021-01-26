import { TestBed } from '@angular/core/testing';

import { AdminFormsComponentResolverService } from './admin-forms-component-resolver.service';

describe('AdminFormsComponentResolverService', () => {
  let service: AdminFormsComponentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormsComponentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

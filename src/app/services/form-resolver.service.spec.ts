import { TestBed } from '@angular/core/testing';

import { FormResolverService } from './form-resolver.service';

describe('FormResolverService', () => {
  let service: FormResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

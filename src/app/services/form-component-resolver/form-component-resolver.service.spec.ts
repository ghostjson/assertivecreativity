import { TestBed } from '@angular/core/testing';

import { FormComponentResolverService } from './form-component-resolver.service';

describe('FormComponentResolverService', () => {
  let service: FormComponentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormComponentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

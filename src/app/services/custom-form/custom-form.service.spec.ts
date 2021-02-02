import { TestBed } from '@angular/core/testing';

import { CustomFormService } from './custom-form.service';

describe('CustomFormService', () => {
  let service: CustomFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

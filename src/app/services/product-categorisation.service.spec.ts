import { TestBed } from '@angular/core/testing';

import { ProductCategorisationService } from './product-categorisation.service';

describe('ProductCategorisationService', () => {
  let service: ProductCategorisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategorisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

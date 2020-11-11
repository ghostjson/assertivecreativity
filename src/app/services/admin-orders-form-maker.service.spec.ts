import { TestBed } from '@angular/core/testing';

import { AdminOrdersFormMakerService } from './admin-orders-form-maker.service';

describe('AdminOrdersFormMakerService', () => {
  let service: AdminOrdersFormMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrdersFormMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

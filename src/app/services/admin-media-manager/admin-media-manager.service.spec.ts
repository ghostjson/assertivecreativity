import { TestBed } from '@angular/core/testing';

import { AdminMediaManagerService } from './admin-media-manager.service';

describe('AdminMediaManagerService', () => {
  let service: AdminMediaManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMediaManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

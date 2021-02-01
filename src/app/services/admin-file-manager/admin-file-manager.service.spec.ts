import { TestBed } from '@angular/core/testing';

import { AdminFileManagerService } from './admin-file-manager.service';

describe('AdminFileManagerService', () => {
  let service: AdminFileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

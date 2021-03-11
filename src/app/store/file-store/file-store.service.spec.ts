import { TestBed } from '@angular/core/testing';

import { FileStoreService } from './file-store.service';

describe('FileStoreService', () => {
  let service: FileStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

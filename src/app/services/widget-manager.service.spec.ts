import { TestBed } from '@angular/core/testing';

import { WidgetManagerService } from './widget-manager.service';

describe('WidgetManagerService', () => {
  let service: WidgetManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

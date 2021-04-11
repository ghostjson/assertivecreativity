import { TestBed } from '@angular/core/testing';

import { FabricCanvasService } from './fabric-canvas.service';

describe('FabricCanvasService', () => {
  let service: FabricCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

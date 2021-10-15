import { TestBed } from '@angular/core/testing';

import { RowBackendService } from './row-backend.service';

describe('RowBackendService', () => {
  let service: RowBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

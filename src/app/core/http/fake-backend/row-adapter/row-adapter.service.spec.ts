import { TestBed } from '@angular/core/testing';

import { RowAdapterService } from './row-adapter.service';

describe('RowAdapterService', () => {
  let service: RowAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

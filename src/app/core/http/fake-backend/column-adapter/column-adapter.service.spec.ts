import { TestBed } from '@angular/core/testing';

import { ColumnAdapterService } from './column-adapter.service';

describe('ColumnAdapterService', () => {
  let service: ColumnAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

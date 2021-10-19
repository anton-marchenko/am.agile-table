import { TestBed } from '@angular/core/testing';

import { DictionaryBackendService } from './dictionary-backend.service';

describe('DictionaryBackendService', () => {
  let service: DictionaryBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

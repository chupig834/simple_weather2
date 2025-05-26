import { TestBed } from '@angular/core/testing';

import { ResultStatusService } from './result-status.service';

describe('ResultStatusService', () => {
  let service: ResultStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

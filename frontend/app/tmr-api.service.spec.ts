import { TestBed } from '@angular/core/testing';

import { TmrApiService } from './tmr-api.service';

describe('TmrApiService', () => {
  let service: TmrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TmrDataService } from './tmr-data.service';

describe('TmrDataService', () => {
  let service: TmrDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmrDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

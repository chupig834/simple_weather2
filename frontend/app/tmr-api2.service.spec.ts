import { TestBed } from '@angular/core/testing';

import { TmrApi2Service } from './tmr-api2.service';

describe('TmrApi2Service', () => {
  let service: TmrApi2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmrApi2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

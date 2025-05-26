import { TestBed } from '@angular/core/testing';

import { PlaceAPIService } from './place-api.service';

describe('PlaceAPIService', () => {
  let service: PlaceAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LieuDeCampingServiceService } from './lieu-de-camping-service.service';

describe('LieuDeCampingServiceService', () => {
  let service: LieuDeCampingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LieuDeCampingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

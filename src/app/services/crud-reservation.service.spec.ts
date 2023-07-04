import { TestBed } from '@angular/core/testing';

import { CrudReservationService } from './crud-reservation.service';

describe('CrudReservationService', () => {
  let service: CrudReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

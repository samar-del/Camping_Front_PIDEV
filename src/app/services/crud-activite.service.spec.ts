import { TestBed } from '@angular/core/testing';

import { CrudActiviteService } from './crud-activite.service';

describe('CrudActiviteService', () => {
  let service: CrudActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

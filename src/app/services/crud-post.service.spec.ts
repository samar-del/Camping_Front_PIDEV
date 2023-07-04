import { TestBed } from '@angular/core/testing';

import { CrudPostService } from './crud-post.service';

describe('CrudPostService', () => {
  let service: CrudPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CrudForumCommentsService } from './crud-forum-comments.service';

describe('CrudForumCommentsService', () => {
  let service: CrudForumCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudForumCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

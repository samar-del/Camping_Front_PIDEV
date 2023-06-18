import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCommentAdminComponent } from './forum-comment-admin.component';

describe('ForumCommentAdminComponent', () => {
  let component: ForumCommentAdminComponent;
  let fixture: ComponentFixture<ForumCommentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCommentAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCommentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

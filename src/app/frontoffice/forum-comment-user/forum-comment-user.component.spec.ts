import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCommentUserComponent } from './forum-comment-user.component';

describe('ForumCommentUserComponent', () => {
  let component: ForumCommentUserComponent;
  let fixture: ComponentFixture<ForumCommentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCommentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCommentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

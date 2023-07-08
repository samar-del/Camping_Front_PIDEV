import {Component, NgZone, OnInit} from '@angular/core';
import {ForumComments} from "../../models/forum-comments";
import {CrudForumCommentsService} from "../../services/crud-forum-comments.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Post} from "../../models/post";

@Component({
  selector: 'app-forum-comment-user',
  templateUrl: './forum-comment-user.component.html',
  styleUrls: ['./forum-comment-user.component.scss']
})
export class ForumCommentUserComponent implements OnInit {

  postId!: number;
  comments: Comment[] = [];
  // @ts-ignore
  newComment: ForumComments = { content: '', datePosted: '' };
  form = false;
  constructor(private commentService: CrudForumCommentsService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /*addComment(comment: any){
    this.commentService.addComment(comment).subscribe(() => {
      this.commentService.getAllComments();
      this.form = false;
    });
  }*/
  addComment(comment: ForumComments) {
    this.commentService.addComment(comment).subscribe(
      (response: any) => {
        // Comment added successfully
        // You can perform additional actions here, such as refreshing the comment list
        console.log('New comment added:', response);
        this.form = false;
      },
      (error: any) => {
        // Handle the error occurred while adding the comment
        console.error('Error adding comment:', error);
      }
    );
  }

  addNewComment() {
    if (this.newComment.content && this.newComment.datePosted) {
      this.commentService.addCommentToPost(this.newComment, this.postId).subscribe(
        (comment: any) => {
          // Comment added successfully
          // Update the comments list with the newly added comment
          this.comments.push(comment);
          // Reset the new comment form
          // @ts-ignore
          this.newComment = { content: '', datePosted: '' };
          // Close the modal if needed
          this.modalService.dismissAll();
        },
        (error: any) => {
          // Handle the error occurred while adding the comment
          console.error('Error adding comment:', error);
        }
      );
    }
  }



}

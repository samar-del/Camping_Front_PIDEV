import {Component, Input, NgZone, OnInit} from '@angular/core';
import { ForumComments } from '../../models/forum-comments';
import { CrudForumCommentsService } from "../../services/crud-forum-comments.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  @Input() postId!: number;
  listComments: ForumComments[] = [];
  form: boolean = false;
  closeResult!: string;


  constructor(private commentService: CrudForumCommentsService,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    // @ts-ignore
    this.commentService.getCommentsByPostId(this.postId).subscribe((comments: ForumComments[]) => {
      this.listComments = comments;
    });
  }

  editComment(comment: ForumComments): void {
    this.commentService.updateComment(comment).subscribe(
      (updatedComment: any) => {
        const index = this.listComments.findIndex(c => c.idComment === updatedComment.idComment);
        if (index !== -1) {
          this.listComments[index] = updatedComment;
        }
      },
      (error: any) => {
        console.error('Error updating comment:', error);
      }
    );
  }


  deleteComment(commentId: number): void {
    // Implement the logic to handle deleting a comment
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId).subscribe(
        () => {
          // Remove the comment from the list
          this.listComments = this.listComments.filter(c => c.idComment !== commentId);
        },
        (error: any) => {
          console.error('Error deleting comment:', error);
        }
      );
    }
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  cancel() {
    this.form = false;
  }


}

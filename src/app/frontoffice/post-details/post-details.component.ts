import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { CrudPostService } from '../../services/crud-post.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ForumCommentUserComponent} from "../forum-comment-user/forum-comment-user.component";
import {CrudForumCommentsService} from "../../services/crud-forum-comments.service";
import {ForumComments} from "../../models/forum-comments";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  postId!: number;
  comments: Comment[] = [];
  closeResult! : string;
  form : boolean = false;
  // @ts-ignore
  newComment: ForumComments = { content: '', datePosted: '' };

  // @ViewChild('mymodal1') newCommentModal: any;

  constructor(
    private route: ActivatedRoute,
    private postService: CrudPostService,
    private commentService: CrudForumCommentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.getPostDetails(this.postId);
    });
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

  /*openNewCommentModal() {
    const modalRef = this.modalService.open(ForumCommentUserComponent, { size: 'lg' }); // Open the new comment modal with a specific size (e.g., 'lg')
    modalRef.result.then(
      (result) => {
        // Handle the result when the modal is closed (e.g., new comment added)
        console.log('New comment added:', result);
        // You can perform additional actions here, such as refreshing the comment list
      },
      (reason) => {
        // Handle the dismissal or closing of the modal without adding a new comment
        console.log('Modal dismissed:', reason);
      }
    );
  }*/

  /*openNewCommentModal() {
    const modalRef = this.modalService.open(this.newCommentModal, { size: 'lg' }); // Open the new comment modal with a specific size (e.g., 'lg')
    modalRef.result.then(
      (result) => {
        // Handle the result when the modal is closed (e.g., new comment added)
        console.log('New comment added:', result);
        // You can perform additional actions here, such as refreshing the comment list
      },
      (reason) => {
        // Handle the dismissal or closing of the modal without adding a new comment
        console.log('Modal dismissed:', reason);
      }
    );
  }*/
  openNewCommentModal() {
    const modalRef = this.modalService.open('mymodal1', { size: 'lg' }); // Use the template reference 'mymodal1'
    modalRef.result.then(
      (result) => {
        // Handle the result when the modal is closed (e.g., new comment added)
        console.log('New comment added:', result);
        // You can perform additional actions here, such as refreshing the comment list
      },
      (reason) => {
        // Handle the dismissal or closing of the modal without adding a new comment
        console.log('Modal dismissed:', reason);
      }
    );
  }

  getPostDetails(postId: number): void {
    this.postService.getPostById(postId).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (error: any) => {
        console.error('Error retrieving post details:', error);
      }
    );
  }

  /*addNewComment() {
    this.commentService.addComment(this.newComment).subscribe(
      (comment: any) => {
        // Comment added successfully
        // Update the comments list with the newly added comment
        // @ts-ignore
        this.comments.push(comment);
        // Reset the new comment form
        // @ts-ignore
        this.newComment = { content: '', datePosted: '' };
        // Close the modal
        this.modalService.dismissAll();
      },
      (error) => {
        // Handle the error occurred while adding the comment
        console.error(error);
      }
    );
  }*/

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

  cancel(){
    this.form = false;
  }


}




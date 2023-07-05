import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ForumComments} from "../../models/forum-comments";
import {CrudForumCommentsService} from "../../services/crud-forum-comments.service";

@Component({
  selector: 'app-forum-comment-admin',
  templateUrl: './forum-comment-admin.component.html',
  styleUrls: ['./forum-comment-admin.component.scss']
})
export class ForumCommentAdminComponent implements OnInit {

  listComments: any = [];
  form = false;
  comment: ForumComments = new ForumComments();
  closeResult!: string;

  constructor(private commentService: CrudForumCommentsService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) { }

  ngOnInit(): void {
      this.commentService.getAllComments().subscribe(res => {console.log(res);
      this.listComments = res; });
  }

  getAllComments(){
    this.commentService.getAllComments().subscribe(res => this.listComments = res);
  }

  addComment(comment: any){
    this.commentService.addComment(comment).subscribe(() => {
      this.commentService.getAllComments();
      this.form = false;
    });
  }
  updateComment(comment: ForumComments){
    this.commentService.updateComment(comment).subscribe();
  }

  deleteComment(idComment: any){
    this.commentService.deleteComment(idComment).subscribe(() => this.getAllComments());
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

  closeForm(){

  }
  cancel(){
    this.form = false;
  }

}


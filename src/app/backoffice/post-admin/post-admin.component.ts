import { Component, OnInit, NgZone, NgModule } from '@angular/core';
import {Post} from '../../models/post';
import {CrudPostService} from '../../services/crud-post.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.scss']
})
export class PostAdminComponent implements OnInit {

  listPosts: any = [];
  form = false;
  post: Post = new Post();
  closeResult!: string;

  constructor(private postService: CrudPostService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(res => {console.log(res);
      this.listPosts = res; });
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(res => this.listPosts = res);
  }

  addPost(post: any){
    this.postService.addPost(post).subscribe(() => {
      this.postService.getAllPosts();
      this.form = false;
    });
  }
  updatePost(post: Post){
    this.postService.updatePost(post).subscribe();
  }

  deletePost(idPost: any){
    this.postService.deletePost(idPost).subscribe(() => this.getAllPosts());
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


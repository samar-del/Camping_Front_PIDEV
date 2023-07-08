import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../models/post';
import {CrudPostService} from '../../services/crud-post.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import { ForumComments } from '../../models/forum-comments';



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

  // Add a new property to store the selected image URL
  selectedImage: string = '';
  comments: { [postId: number]: ForumComments[] } = {};

  // Add a new property to store the comment content
  newComment: { content: string } = { content: '' };


// Method to open the image modal
  @ViewChild('imageModal', {static: false}) imageModal: ElementRef | undefined;
  @ViewChild('commentModal') commentModal: any;

   open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.modalService.open(this.imageModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  openCommentModal(content: any) {
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


  imageUrls: string[] = []

  constructor(private postService: CrudPostService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private sanitizer: DomSanitizer,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(res => {
      console.log(res);
      this.listPosts = res;
    });
  }

  getAllPosts() {
    // @ts-ignore
    this.postService.getAllPosts().subscribe((res: Post[]) => {
      this.listPosts = res;
      this.listPosts.forEach((post: Post) => {
        // @ts-ignore
        this.postService.getPostComments(post.postId).subscribe((comments: ForumComments[]) => {
          this.comments[post.postId] = comments;
        });
      });
    });
  }


  addPost(post: Post, imageInput: HTMLInputElement) {
    const formData = new FormData();
    const newPost: Post = { ...post }; // Create a copy of the post object

    // Assign values from the form to the newPost object
    newPost.title = post.title;
    newPost.description = post.description;
    newPost.date = post.date;

    // Append the newPost object to the form data
    formData.append('post', JSON.stringify(newPost));

    // Check if a file is selected
    if (imageInput.files && imageInput.files.length > 0) {
      const file: File = imageInput.files[0];
      formData.append('mediaContent', file, file.name);
    }

    this.postService.addPost(formData).subscribe(
      (response: any) => {
        // Post added successfully, handle the response as needed
        console.log('Post added:', response);

        // Reset the form and reload the posts
        this.post = new Post();
        this.getAllPosts();
      },
      (error: any) => {
        // Handle the error case
        console.error('Error adding post:', error);
        // Optionally display an error message to the user
      }
    );
  }

  // Add the logic to add a comment to a post
  addComment(postId: number) {
    // Create a new comment object
    const comment = {
      postId: postId,
      content: this.newComment.content
    };

    // Call the service method to add the comment
    this.postService.addComment(comment).subscribe(
      (response: any) => {
        // Comment added successfully, handle the response as needed
        console.log('Comment added:', response);

        // Clear the new comment input field
        this.newComment.content = '';

        // Refresh the comments for the post
        this.refreshPostComments(postId);
      },
      (error: any) => {
        // Handle the error case
        console.error('Error adding comment:', error);
        // Optionally display an error message to the user
      }
    );
  }

  refreshPostComments(postId: number) {
    // @ts-ignore
    this.postService.getPostComments(postId).subscribe((comments: ForumComments[]) => {
      this.comments[postId] = comments;
    });
  }

  updatePost(post: Post) {
    this.postService.updatePost(post).subscribe();
  }

  deletePost(postId: any) {
    this.postService.deletePost(postId).subscribe(() => this.getAllPosts());
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  blobToUrl(blobData: string): SafeUrl {
    if (!blobData) return '';

    const base64Image = 'data:image/jpeg;base64,' + blobData;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }


  openEditModal(content: any) {
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

    modalRef.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeForm() {

  }

  cancel() {
    this.form = false;
  }

}


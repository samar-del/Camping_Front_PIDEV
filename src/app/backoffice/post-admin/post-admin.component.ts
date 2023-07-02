import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../models/post';
import {CrudPostService} from '../../services/crud-post.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";



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

// Method to open the image modal
  @ViewChild('imageModal', {static: false}) imageModal: ElementRef | undefined;

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
    this.postService.getAllPosts().subscribe(res => this.listPosts = res);
  }

  addPost(post: Post, imageInput: HTMLInputElement) {
    const formData = new FormData();

    // Append the post data to the form data
    formData.append('post', JSON.stringify(post));

    // Check if a file is selected
    if (imageInput.files && imageInput.files.length > 0) {
      const file: File = imageInput.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64Image = event.target.result;
        formData.append('mediaContent', base64Image);
        this.postService.addPost(formData).subscribe(() => {
          this.getAllPosts();
          this.form = false;
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.postService.addPost(formData).subscribe(() => {
        this.getAllPosts();
        this.form = false;
      });
    }
  }



  updatePost(post: Post) {
    this.postService.updatePost(post).subscribe();
  }

  deletePost(idPost: any) {
    this.postService.deletePost(idPost).subscribe(() => this.getAllPosts());
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


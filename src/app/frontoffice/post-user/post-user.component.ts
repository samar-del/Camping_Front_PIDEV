import {Component, NgZone, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CrudPostService} from "../../services/crud-post.service";
import {CrudForumCommentsService} from "../../services/crud-forum-comments.service";
import {Activite} from "../../models/Activite";
import {CrudActiviteService} from "../../services/crud-activite.service";

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss']
})
export class PostUserComponent implements OnInit {


  listPosts: any = [];
  listActivites: any = [];
  form: boolean = false;
  closeResult!: string;
  selectedPost: any;

  searchText: string = '';
  searchDate!: Date;
  post: Post = new Post();
  filteredPosts: Post[] = [];



  constructor(private postService: CrudPostService,
              private activiteService : CrudActiviteService,
              private commentService: CrudForumCommentsService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res: Post[]) => {
      console.log(res);
      this.listPosts = res;
      this.filteredPosts = [...this.listPosts]; // Initialize filteredPosts with all posts initially
    });
    this.getAllActivites();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => this.listPosts = res)
  }
  getAllActivites(){
    this.activiteService.getAllActivites().subscribe(res => this.listActivites = res)
  }
  filterPosts() {
    // Filter the list of posts based on the search text
    this.filteredPosts = this.listPosts.filter((post: Post) =>
      post.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      post.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  blobToUrl(blobData: string): SafeUrl {
    if (!blobData) return '';

    const base64Image = 'data:image/jpeg;base64,' + blobData;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

  /* addReservationActivite(reservation: any){
     this.reservationService.addReservationActivite(reservation,this.selectedActivity).subscribe(() => {
       this.reservationService.getAllReservations();
       this.form = false;
     });
     Swal.fire('Un email de confirmation a été envoyé a votre adresse mail !')

   }*/

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
  viewPostDetails(postId: number) {
    this.router.navigate(['/post-details', postId]);
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
      return `with: ${reason}`;
    }
  }

  closeForm() {

  }

  cancel() {
    this.form = false;
  }

}

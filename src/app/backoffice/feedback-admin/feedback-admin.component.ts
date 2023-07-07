import {Component, NgZone, OnInit} from '@angular/core';
import {CrudFeedbackService} from "../../services/crud-feedback.service";
import {CrudActiviteService} from "../../services/crud-activite.service";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.scss']
})
export class FeedbackAdminComponent implements OnInit {

  feedbacks: any = [];
  users: any = [];
  activites: any = [];
  feedback: any;
  closeResult!: string;
  form: boolean = false;

  constructor(private feedbackService: CrudFeedbackService,
              private activiteService: CrudActiviteService,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) {
  }

  getAllUsers() {
    this.feedbackService.getAllUsers().subscribe(
      data => this.users = data
    )
  }


  getAllActivtes() {
    this.activiteService.getAllActivites().subscribe(data => this.activites = data)
  }

  getAllFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe(data => this.feedbacks = data);
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllActivtes();
  }

  addFeedback(feedback: any) {
    this.feedbackService.addFeedback(feedback).subscribe();
  }

  editFeedback(feedback: any) {
    this.feedbackService.editFeedback(feedback).subscribe();
  }

  deleteFeedback(idFeedback: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedbackService.deleteFeedback(idFeedback).subscribe(() => {
          this.getAllFeedbacks();
          Swal.fire(
            'Deleted!',
            'Feedback a été supprimée',
            'success'
          );
        });
      }
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
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }

}

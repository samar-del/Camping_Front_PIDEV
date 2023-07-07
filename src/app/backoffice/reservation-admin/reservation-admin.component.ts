import {Component, NgZone, OnInit} from '@angular/core';
import {Activite} from "../../models/Activite";
import {Reservation} from "../../models/Reservation";
import {CrudReservationService} from "../../services/crud-reservation.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CrudActiviteService} from "../../services/crud-activite.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.scss']
})
export class ReservationAdminComponent implements OnInit {

  reservation: Reservation = new Reservation();
  listReservation :any = [];
  listActivites :any = [];
  form : boolean = false;
  closeResult! : string;
  selectedActivity: any;

  constructor(
    private reservationService : CrudReservationService,
    private activiteService : CrudActiviteService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(res=>{console.log(res)
      this.listReservation=res;});
    this.listActivites= this.getAllActivites();
  }

  getAllReservations(){
    this.reservationService.getAllReservations().subscribe(res => this.listReservation = res)
  }

  getAllActivites(){
    this.activiteService.getAllActivites().subscribe(res => this.listActivites = res)
  }

  addReservation(reservation: any){
    this.reservationService.addReservation(reservation).subscribe(() => {
      this.getAllReservations();
      this.form = false;
    });
  }

  addReservationActivite(reservation: any){
    this.reservationService.addReservationActivite(reservation,this.selectedActivity).subscribe(() => {
      this.getAllReservations();
      this.form = false;
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Votre réservation a été bien enregistrée',
      showConfirmButton: false,
      timer: 1500
    })
  }

  editReservation(reservation : Reservation){
    this.reservationService.editReservation(reservation).subscribe();
  }

  deleteReservation(idReservation : any){
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
        this.reservationService.deleteReservation(idReservation).subscribe(() => {
          this.getAllReservations();
          Swal.fire(
            'Deleted!',
            'Réservation a été supprimée',
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
      return  `with: ${reason}`;
    }
  }

  closeForm(){

  }
  cancel(){
    this.form = false;
  }



}

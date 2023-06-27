import {Component, NgZone, OnInit} from '@angular/core';
import {Activite} from "../../models/Activite";
import {Reservation} from "../../models/Reservation";
import {CrudReservationService} from "../../services/crud-reservation.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.scss']
})
export class ReservationAdminComponent implements OnInit {

  reservation: Reservation = new Reservation();
  listReservation :any = [];
  form : boolean = false;
  closeResult! : string;

  constructor(
    private reservationService : CrudReservationService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(res=>{console.log(res)
      this.listReservation=res;});
  }

  getAllReservations(){
    this.reservationService.getAllReservations().subscribe(res => this.listReservation = res)
  }

  addReservation(reservation: any){
    this.reservationService.addReservation(reservation).subscribe(() => {
      this.getAllReservations();
      this.form = false;
    });
  }

  editReservation(reservation : Reservation){
    this.reservationService.editReservation(reservation).subscribe();
  }

  deleteReservation(idReservation : any){
    this.reservationService.deleteReservation(idReservation).subscribe(() => this.getAllReservations())
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

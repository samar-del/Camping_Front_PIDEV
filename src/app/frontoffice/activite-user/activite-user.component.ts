import {Component, NgZone, OnInit} from '@angular/core';
import {CrudActiviteService} from "../../services/crud-activite.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CrudReservationService} from "../../services/crud-reservation.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Reservation} from "../../models/Reservation";
import Swal from "sweetalert2";

@Component({
  selector: 'app-activite-user',
  templateUrl: './activite-user.component.html',
  styleUrls: ['./activite-user.component.scss']
})
export class ActiviteUserComponent implements OnInit {
  reservation: Reservation = new Reservation();
  listActivites :any = [];
  form : boolean = false;
  closeResult! : string;
  selectedActivity: any;
  constructor(private activiteService : CrudActiviteService,
              private reservationService : CrudReservationService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activiteService.getAllActivites().subscribe(res=>{console.log(res)
      this.listActivites=res;});
  }

  getAllActivites(){
    this.activiteService.getAllActivites().subscribe(res => this.listActivites = res)
  }

  blobToUrl(blobData: string): SafeUrl {
    if (!blobData) return '';

    const base64Image = 'data:image/jpeg;base64,' + blobData;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

  addReservationActivite(reservation: any){
    this.reservationService.addReservationActivite(reservation,this.selectedActivity).subscribe(() => {
      this.reservationService.getAllReservations();
      this.form = false;
    });
    Swal.fire('Un email de confirmation a été envoyé a votre adresse mail !')

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

import { Component, OnInit,NgZone,NgModule } from '@angular/core';
import { Activite } from '../../models/Activite';
import { CrudActiviteService } from '../../services/crud-activite.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-activite-admin',
  templateUrl: './activite-admin.component.html',
  styleUrls: ['./activite-admin.component.scss']
})
export class ActiviteAdminComponent implements OnInit {
  activite: Activite = new Activite();
  listActivites :any = [];
  form : boolean = false;
  closeResult! : string;
  imageUrls: string[] = [];
  constructor(private activiteService : CrudActiviteService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activiteService.getAllActivites().subscribe(res=>{console.log(res)
    this.listActivites=res;});
  }

  blobToUrl(blobData: string): SafeUrl {
    if (!blobData) return '';

    const base64Image = 'data:image/jpeg;base64,' + blobData;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }
  openImageInNewWindow(imageUrl: string) {
    window.open(imageUrl, '_blank');
  }




  getAllActivites(){
    this.activiteService.getAllActivites().subscribe(res => this.listActivites = res)
  }

  addActivite(activite: Activite,imageInput: HTMLInputElement){
    const formData = new FormData();
    // Append the post data to the form data
    formData.append('activite', JSON.stringify(activite));

    // Check if a file is selected
    if (imageInput.files && imageInput.files.length > 0) {
      const file: File = imageInput.files[0];
      formData.append('image', file, file.name);
    }

    this.activiteService.addActivite(formData).subscribe(() => {
      this.getAllActivites();
      this.form = false;
    });

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Votre activité a été bien enregistrée',
      showConfirmButton: false,
      timer: 1500
    })
  }
 /* addActivite(activite: any){
    this.activiteService.addActivite(activite).subscribe(() => {
      this.getAllActivites();
      this.form = false;
    });
  }*/

  //addActivite(activite: any, idLieu:any){
  //  this.activiteService.addActivite(activite,idLieu).subscribe(() => {
   //   this.activiteService.getAllActivites();
    //  this.form = false;
  //  });
  //}

  editActivite(activite : Activite){
    this.activiteService.editActivite(activite).subscribe();
  }

  deleteActivite(idActivite : any){
   // this.activiteService.deleteActivite(idActivite).subscribe(() => this.getAllActivites())
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
        this.activiteService.deleteActivite(idActivite).subscribe(() => {
          this.getAllActivites();
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

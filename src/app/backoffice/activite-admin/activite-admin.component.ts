import { Component, OnInit,NgZone,NgModule } from '@angular/core';
import { Activite } from '../../models/Activite';
import { CrudActiviteService } from '../../services/crud-activite.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activite-admin',
  templateUrl: './activite-admin.component.html',
  styleUrls: ['./activite-admin.component.scss']
})
export class ActiviteAdminComponent implements OnInit {

  listActivites :any = [];
  form : boolean = false;
  activite!: Activite;
  closeResult! : string;

  constructor(private activiteService : CrudActiviteService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.activiteService.getAllActivites().subscribe(res=>{console.log(res)
    this.listActivites=res;});
  }

  getAllActivites(){
    this.activiteService.getAllActivites().subscribe(res => this.listActivites = res)
  }

  addActivite(activite: any, idLieu:any){
    this.activiteService.addActivite(activite,idLieu).subscribe(() => {
      this.activiteService.getAllActivites();
      this.form = false;
    });
  }

  deleteActivite(idActivite : any){
    this.activiteService.deleteActivite(idActivite).subscribe(() => this.getAllActivites())
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

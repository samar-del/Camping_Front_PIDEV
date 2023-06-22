import {Component, NgZone, OnInit} from '@angular/core';
import {LieuDeCamping} from "../../models/LieuDeCamping";
import {LieuDeCampingServiceService} from "../../services/lieu-de-camping-service.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-lieu-admin',
  templateUrl: './lieu-admin.component.html',
  styleUrls: ['./lieu-admin.component.scss']
})
export class LieuAdminComponent implements OnInit {
lieuDeCamping: LieuDeCamping = new LieuDeCamping();
listLieu: any = [];
form : boolean = false;
closeResult! : string;

  constructor(private lieuService : LieuDeCampingServiceService ,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.lieuService.getAllLieu().subscribe(res=>{console.log(res)
      this.listLieu=res;})
  }
getAllLieu(){
    this.lieuService.getAllLieu().subscribe(res =>this.listLieu = res)
}
  addLieu(lieu: any){
    this.lieuService.addLieu(lieu).subscribe(() => {
      this.getAllLieu();
      this.form = false;
    });
  }

  //addActivite(activite: any, idLieu:any){
  //  this.activiteService.addActivite(activite,idLieu).subscribe(() => {
  //   this.activiteService.getAllActivites();
  //  this.form = false;
  //  });
  //}

  editLieu(lieu : LieuDeCamping){
    this.lieuService.editLieu(lieu).subscribe();
  }

  deleteLieu(idLieu : any){
    this.lieuService.deleteLieu(idLieu).subscribe(() => this.getAllLieu())
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

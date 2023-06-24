import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  listUsers : any = [];
  form : boolean = false;
  user : User = new User();
  closeResult! : string;
  constructor(private userService : UserService, private modalService: NgbModal,
              private router: Router,
              private ngZone: NgZone,
              ) { }

  ngOnInit(): void {
   this.userService.getAllUsers().subscribe(res=>{console.log(res)
   this.listUsers=res;
   });
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe(res => this.listUsers = res)
  }

  addUser(user: any){
    this.userService.addUser(user).subscribe(() => {
      this.getAllUsers();
      this.form = false;
    });
  }

  editUser(user : User){
    this.userService.editUser(user).subscribe();
  }
  deleteUser(idUser : any){
    this.userService.deleteUser(idUser).subscribe(() => this.getAllUsers())
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

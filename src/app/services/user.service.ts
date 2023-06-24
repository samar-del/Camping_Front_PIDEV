import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly API_URL = 'http://localhost:8082';
  constructor(private httpClient: HttpClient) { }
  getAllUsers() {
    return this.httpClient.get(`${this.API_URL}/utilisateur/ListUtilisateur`)
  }

  addUser(user : any) {
    return this.httpClient.post(`${this.API_URL}/utilisateur/add-Utilisateur`, user)
  }
  editUser(user : any){
    return this.httpClient.put(`${this.API_URL}/utilisateur/edit-Utilisateur`, user)
  }

  deleteUser(idUser : any){
    return  this.httpClient.delete(`${this.API_URL}/utilisateur/delete-Utilisateur/${idUser}`)
  }
}

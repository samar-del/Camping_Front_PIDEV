import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LieuDeCamping} from "../models/LieuDeCamping";

@Injectable({
  providedIn: 'root'
})
export class LieuDeCampingServiceService {
  API_URL="http://localhost:8089/SpringMVC/lieu";

  constructor(private httpClient: HttpClient) {}
  getAllLieu(){
    return this.httpClient.get(`${this.API_URL}/all-lieu`)
  }
  addLieu(lieu : any) {
    return this.httpClient.post(`${this.API_URL}/add-lieu`, lieu)
  }

  editLieu(lieu: LieuDeCamping){
    return this.httpClient.put(`${this.API_URL}/edit-lieu`, lieu)
  }

  //addActivite(activite : any, idLieu:any) {
  // return this.httpClient.post(`${this.API_URL}/assignLieuToActivite/${idLieu}`, activite)
  //}

  deleteLieu(idLieu : any){
    return  this.httpClient.delete(`${this.API_URL}/delete-lieu/${idLieu}`)
  }
}

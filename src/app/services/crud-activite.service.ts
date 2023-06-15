import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CrudActiviteService {
  readonly API_URL = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) { }

  getAllActivites() {
    return this.httpClient.get(`${this.API_URL}/all-activite`)
  }

  addActivite(activite : any, idLieu:any) {
    return this.httpClient.post(`${this.API_URL}/assignLieuToActivite/${idLieu}`, activite)
  }

  deleteActivite(idActivite : any){
    return  this.httpClient.delete(`${this.API_URL}/delete-activite/${idActivite}`)
  }

}

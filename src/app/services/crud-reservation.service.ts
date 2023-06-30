import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Activite} from "../models/Activite";
import {Reservation} from "../models/Reservation";

@Injectable({
  providedIn: 'root'
})
export class CrudReservationService {
  readonly API_URL = 'http://localhost:8082';
  constructor(private httpClient: HttpClient) { }

  getAllReservations() {
    return this.httpClient.get(`${this.API_URL}/all-reservation`)
  }

  addReservation(reservation : any) {
    return this.httpClient.post(`${this.API_URL}/add-reservation`, reservation)
  }

  addReservationActivite(reservation : any, idActivite : any) {
    return this.httpClient.post(`${this.API_URL}/addReservationActivity/${idActivite}`, reservation)
  }

  editReservation(reservation: Reservation){
    return this.httpClient.put(`${this.API_URL}/edit-reservation`, reservation)
  }

  deleteReservation(idReservation : any){
    return  this.httpClient.delete(`${this.API_URL}/delete-reservation/${idReservation}`)
  }
}

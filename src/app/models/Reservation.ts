import {Activite} from "./Activite";

export class Reservation {
  idReservation!: number;
  nbrPersonne!: number;
  date_deb!: Date;
  date_fin!: Date;
  prixTotal!: number;
  nom!: string;
  telephone!:number;
  transport!:string;
  email!:string;
  activite!:Activite;
}

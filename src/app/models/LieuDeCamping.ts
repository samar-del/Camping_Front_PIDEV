export class LieuDeCamping {
  idLieu! : number;
  nomLieu! : String;
  descriptionLieu! : String;
  imageLieu! : String;
  typeLieu! : TypeLieu;
  capaciteLieu! : number;
}

enum TypeLieu {
  ENDROIT_LIBRE, CENTREDECAMPING
}


export interface IEvnmt {
  id: number;
  groupe_id: number;
  // location_id: number

  address: string;
  city: string;
  country: string;

  nom: string;
  date: Date;
  hrdeb: string;
  hrfin: string;
  statut: string;
  descr: string;
  contenu: string;
  rapport: string;
  famaccueil: string;
  resp1: string;
  resp2: string;
  affich: boolean;
  groupe: IGroupe;
  // location: ILocation
  evnmtdtls: IEvnmtdtl[];
}
export interface IEvnmtdtl {
        id: number
        evnmt_id: number
        ordre: number
        title: string
        resp: string
        resume: string
        contenu: string
        duree: number
}

export interface IGroupe {
  id: number
  nom: string
  mtle_reg: string
  descr: string
  dtcre: Date
  dureexo: number
  dbexo: Date
  cfinexo: Date
  contact: string
  location_id: number
  tel: string
}

//export interface ILocation {
//  id: number 
//  address: string 
//  city: string  
//  country: string      
//}




export interface ITont {
  id: number;
  groupe_id: number		;
  nom: string;
  descr: string;
  mtpart: number;
  dtdeb: Date	;		// new
  dtfin: Date	;		// new
  cot_dern: string;			// new
}


export interface ITontpers {
  id: number;
  tont_id: number;
  pers_id: number;
  position: number;
  alias: string;
  comment: string;
  statut: string;
  dt_statut: Date;
  groupe_id: number;
  moisgain: string;
  dtdeb: Date;
  dtfin: Date;
  cot_dern: string;
  descr: string;
}



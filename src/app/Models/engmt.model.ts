
export interface IEngmt {
  id: number;
  groupe_id: number;
  nom: string;
  descr: string;
  periodicite: string			;
  periode: string			;
  statut: string			;
  mont_unit: number		;
  totalper: number;
  dt_ech: Date	;
}


export interface IEngmtpers {
  id: number;
  engmt_id: number;
  pers_id: number;
  exercice: number;
  statut: string;
  dtchgst: Date;
  message: string;
  dt_ech: Date;
  groupe_id: number;
  mont: number;
  nom_engmt: string;
  descr: string;
  periodicite: string;
  periode: string;
  stat_engmt: string;
  mont_unit: number;
  nom_prenom: string;
}




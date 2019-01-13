
export interface IRpnpers2 {
    id: number
    groupe_id: number
    pers_id: number			// new
    repdt1_id: number			// new
    repdt2_id: number			// new
    dtadh: Date
    mtrle: string
  //  email: string			// new
    depot: number
    dtmajdpt: Date

     nom_pers:string
     prenom_pers:string
     nom_repdt: string
     prenom_repdt : string
}

export interface IRpnpers {
  id: number
  groupe_id: number
  pers_id: number			// new
  repdt1_id: number			// new
  repdt2_id: number			// new
  dtadh: Date
  mtrle: string
//  email: string			// new
  depot: number
  dtmajdpt: Date
}

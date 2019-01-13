
export interface IPers {
  id: number;
  // user_id: number   Pas besoin du user_id, car le lien entre la personne et le user se fait par le courriel
  type: string;
  nom: string;
  prenom: string;
  sexe: string;
  email: string;
  telcel: string;
  telres: string;
  emploi: string;
  dom_activ: string;
  titre_adh: string;
  // location_id: number
  address: string;
  city: string;
  country: string;
  groupe_id: number;
}

export const TypePers = [
  { "code": 'M', "libelle": 'Membre' },
  { "code": 'E', "libelle": 'Enfant du membre' },
  { "code": 'P', "libelle": 'Parent du membre' },
  { "code": 'A', "libelle": 'Ammi du membre' },
  { "code": 'C', "libelle": 'Conjoint du membre' },
];

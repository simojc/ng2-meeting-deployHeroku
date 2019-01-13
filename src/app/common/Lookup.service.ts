import {Injectable} from '@angular/core';

@Injectable()
export class LookupService {


  getStates(): string[] {
    return ['IA', 'CA', 'MN','SD','NY','FL', 'AK'];
  }

  //getTypes(): any {
  //  return [
  //    { "code": 'M', "libelle": 'Membre' },
  //    { "code": 'E', "libelle": 'Enfant du membre' },
  //    { "code": 'P', "libelle": 'Parent du membre' },
  //    { "code": 'A', "libelle": 'Ammi du membre' },
  //    { "code": 'C', "libelle": 'Connaissance du membre' },
  //  ];
  //};

}

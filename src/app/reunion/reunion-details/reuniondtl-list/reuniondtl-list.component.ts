import { Component, Input, OnChanges } from '@angular/core';

import { IEvnmtdtl, IUser } from '../../../Models/index';
import { restrictedWords } from '../../../_directives/index';

import { AuthService } from '../../../user/auth.service';
import { AlertService, AutresService, EvnmtdtlService } from '../../../_services/index';
import {  Router } from '@angular/router';
// import { VoterService } from '../voter.service'


@Component({
  selector: 'reuniondtl-list',
  templateUrl: './reuniondtl-list.component.html'

})

export class ReuniondtllListComponent implements OnChanges {
  @Input() evnmtdtls: IEvnmtdtl[];
  @Input() sortBy: string;
  @Input() evnmtId: number;
  visibleEvnmtdtls: IEvnmtdtl[] = [];
  currentUser: IUser;

  constructor(private router: Router, private auth: AuthService, private evnmtdtlService: EvnmtdtlService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

    ngOnChanges() {
      if (this.evnmtdtls) {
        this.sortBy === 'ordre' ? this.evnmtdtls.sort(sortByOrdreAsc):this.evnmtdtls.sort(sortByTitleAsc)
      }
    }

    editEvnmtdtl(id) {
      this.router.navigate(['/reuniondtl/edit/', id]);
    }

}


function sortByTitleAsc(s1: IEvnmtdtl, s2: IEvnmtdtl) {
  if (s1.title > s2.title) {return 1; }
  else 
  if (s1.title === s2.title) { return 0; }
  else {return -1; }
}

function sortByOrdreAsc(s1: IEvnmtdtl, s2: IEvnmtdtl) {
  return s1.ordre - s2.ordre
}



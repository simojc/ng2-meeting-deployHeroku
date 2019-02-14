import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IRpnpers, IPers, IRpnpers2 } from '../../Models/index';
// import { UserService } from '../user.service';
import { AlertService, RpnpersService, AutresService, PagerService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'rpn-grid.component.html',
    styles: []
})

export class RpnGridComponent implements OnInit {
    currentUser: IUser;
    currentPers: IPers;

    filteredRpnpers: any[];
    rpnpers: any[] = [];

  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredRpnpers = this.listFilter ? this.performFilter(this.listFilter) : this.rpnpers;
  }

  performFilter(filterBy: string): IRpnpers[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.rpnpers.filter((rpnpers: any) =>
      rpnpers.nom_pers.toLocaleLowerCase().indexOf(filterBy) !== -1 );
  }

    constructor(private alertService: AlertService, private rpnpersService: RpnpersService,
        private autresService: AutresService, private router: Router, private pagerService: PagerService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.autresService.getPersCurrentPers().subscribe(pers => {
            this.currentPers = pers;
            // console.log(" Ds subscribe this.currentPers.Nom = " + this.currentPers.nom)   
            this.loadRpnPers();
        });
    }
    getMessageStyle(): any {
        return { color: '#ff0000', 'font-weight': 'bold' };
        // On peut assi utiliser des classe de style pour faire la même chose et utiliser dans le template ngClass à la place de ngStyle.
    }

    private loadRpnPers() {
        // console.log(' JSON.stringify(this.currentPers) =   ' + JSON.stringify(this.currentPers))
        if (!!this.currentPers) {
            this.rpnpersService.getAllRpnGroupe(this.currentUser.groupe_id).subscribe(
                rpnpers => {
                    this.rpnpers = rpnpers;
                    this.filteredRpnpers = rpnpers;
                },
                error => { this.alertService.error(error); }
            );
        }
    }

    Edit(id) {
        this.router.navigate(['/rpn/edit', id]);
    }

    add() {
        this.router.navigate(['/rpn/new']);
    }

    deleteUser(_id: string) {
        // this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

}

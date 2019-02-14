import { Component, OnInit } from '@angular/core';
import { IUser, IEngmtpers, IEngmt } from '../../Models/index';
import { AlertService, PagerService, EngmtService } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'engmt-grid.component.html'
})
export class EngmtGridComponent implements OnInit {
    currentUser: IUser;
    // engmtpers: IEngmtpers[] = [];
    public startDate: any;
    engmnts: IEngmt;
    public endDate: any;


    filteredEngmtpers: IEngmtpers[];
    engmtpers: IEngmtpers[] = [];

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredEngmtpers = this.listFilter ? this.performFilter(this.listFilter) : this.engmtpers;
    }

    constructor(private engmtService: EngmtService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    performFilter(filterBy: string): IEngmtpers[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.engmtpers.filter((engmtpers: IEngmtpers) =>
        engmtpers.nom_prenom.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        engmtpers.statut.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    ngOnInit() {
        // this.loadAllEngmnts();
        this.loadsEngmts();
    }

    private loadsEngmts() {
        this.engmtService.getAll().subscribe(
          res => { this.engmnts = res;
           // console.log(" this.engmnts = " + JSON.stringify(this.engmnts)); 
        },
          error => { this.alertService.error(error); }
        );
      }

    Edit(id) {
        this.router.navigate(['/engmtpers/edit/', id]);
    }

    add() {
        this.router.navigate(['/engmtpers/new']);
      }

      selectchange(args) {
        // const tont_Selected = args.target.value;
        const engmtId = args.target.value;
       //  console.log('engmtId = ' + engmtId);
        this.engmtService.getpersByEngmtId (engmtId).subscribe(
            engmtpers => {
               // console.log(" engmtpers = " + JSON.stringify(engmtpers));
                this.engmtpers = engmtpers;
                this.filteredEngmtpers = this.engmtpers;
            },
            error => { this.alertService.error(error); }
        );
      }

}

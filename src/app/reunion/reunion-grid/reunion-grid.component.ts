

import { Component, OnInit } from '@angular/core';
import { IUser, IEvnmt } from '../../Models/index';
import { EvnmtService } from '../shared/evnmt.service';
import { AlertService, PagerService } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'reunion-grid.component.html'
})
export class ReunionGridComponent implements OnInit {
    currentUser: IUser;
    evnmts: IEvnmt[] = [];
    public startDate: any;
    public endDate: any;
    today: string;

    constructor(private evnmtService: EvnmtService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ngOnInit() {
        this.loadAllReunions();
        const now: Date = new Date();
        this.today = now.toISOString();
    }

    deleteEvnmt(_id: string) {
        this.evnmtService.delete(_id).subscribe(() => { this.loadAllReunions(); });
    }
    private loadAllReunions() {
        this.evnmtService.getEvnmts().subscribe(
            evnmts => {
                this.evnmts = evnmts;
          },
            error => { this.alertService.error(error); }
        );
    }

    EditReunion(id) {
         this.router.navigate(['/reunions/edit/', id]);
      }

    add() {
        this.router.navigate(['/reunions/new']);
      }

}

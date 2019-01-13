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
    // array of all items to be paged
    private allItems: any[] = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    public searchString: string;

    constructor(private evnmtService: EvnmtService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.startDate = new Date();
       //  this.endDate = new Date();
        // console.log(this.currentUser)
    }
    ngOnInit() {
        this.loadAllReunions();
    }

    deleteEvnmt(_id: string) {
        this.evnmtService.delete(_id).subscribe(() => { this.loadAllReunions(); });
    }
    private loadAllReunions() {
        this.evnmtService.getEvnmts().subscribe(
            evnmts => {
                this.evnmts = evnmts;
                this.allItems = evnmts;
                this.setPage(1);
               // console.log(" this.allItems = " + JSON.stringify(this.allItems));
            },
            error => { this.alertService.error(error); }
        );
    }

    EditReunion(id) {
        this.router.navigate(['/evnmt/editEvnmt/', id]);
      }

    // Nouveau  code pour pagination
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
       // console.log(" this.pagedItems = " + JSON.stringify(this.pagedItems));
    }


}

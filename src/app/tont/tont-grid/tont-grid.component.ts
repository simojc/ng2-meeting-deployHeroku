import { Component, OnInit } from '@angular/core';
import { IUser, ITontpers, ITont } from '../../Models/index';
import { AlertService, PagerService, TontService } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'tont-grid.component.html'
})
export class TontGridComponent implements OnInit {
    currentUser: IUser;
    tontpers: ITontpers[] = [];
    public startDate: any;
    public endDate: any;
    // array of all items to be paged
    private allItems: any[] = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    public searchString: string;

    constructor(private tontService: TontService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ngOnInit() {
        this.loadAlltontPers();
    }

    deleteEngmnt(_id: string) {
        this.tontService.delete(_id).subscribe(() => { this.loadAlltontPers(); });
    }
    private loadAlltontPers() {
        this.tontService.getToutesTonts().subscribe(
            tontpers => {
                this.tontpers = tontpers;
                this.allItems = tontpers;
                this.setPage(1);
                // console.log(" this.allItems = " + JSON.stringify(this.allItems));
            },
            error => { this.alertService.error(error); }
        );
    }

    EditEngmnt(id) {
        this.router.navigate(['/tontpers/edit/', id]);
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

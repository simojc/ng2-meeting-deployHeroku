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
    engmtpers: IEngmtpers[] = [];
    public startDate: any;
    public endDate: any;
    // array of all items to be paged
    private allItems: any[] = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    public searchString: string;

    constructor(private engmtService: EngmtService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ngOnInit() {
        this.loadAllEngmnts();
    }

    deleteEngmnt(_id: string) {
        this.engmtService.delete(_id).subscribe(() => { this.loadAllEngmnts(); });
    }
    private loadAllEngmnts() {
        this.engmtService.getAllEngmt().subscribe(
            engmtpers => {
                this.engmtpers = engmtpers;
                this.allItems = engmtpers;
                this.setPage(1);
                // console.log(" this.allItems = " + JSON.stringify(this.allItems));
            },
            error => { this.alertService.error(error); }
        );
    }

    EditEngmnt(id) {
        this.router.navigate(['/Engmnts/editEngmnt/', id]);
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

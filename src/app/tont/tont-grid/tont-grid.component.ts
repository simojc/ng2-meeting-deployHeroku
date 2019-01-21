import { Component, OnInit } from '@angular/core';
import { IUser, ITontpers, ITont } from '../../Models/index';
import { AlertService, PagerService, TontService } from '../../_services/index';
import { Router } from '@angular/router';
// import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'tont-grid.component.html',
    styles: [`
  h1 {text-align:center;}
  h2 {text-align:center;}
	`]
})
export class TontGridComponent implements OnInit {
    currentUser: IUser;
    tontpers: ITontpers[] = [];
    tontines: ITont[];
   // angForm: FormGroup;
    tont_id = -1;
    // array of all items to be paged
    private allItems: any[] = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    // public searchString: string;

    constructor(private tontService: TontService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.createForm();
    }
    ngOnInit() {
        this.loadTonts();
       // this.tont_id = -1;
    }

    deleteEngmnt(_id: string) {
        this.tontService.delete(_id).subscribe();
    }

    private loadTonts() {
        this.tontService.getAllTonts().subscribe(
          res => { this.tontines = res;
            this.tont_id = -1;
        },
          error => { this.alertService.error(error); }
        );
      }

    Edit(id) {
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
/* 
    createForm() {
        this.angForm = this.fb.group({
          tont_id: '',
          searchString: '',
        });
      } */

      add() {
        this.router.navigate(['/tontpers/new']);
      }

    selectchange(args) {
        // const tont_Selected = args.target.value;
        const tontId = args.target.value;
        // console.log('tontId = ' + tontId);
        this.tontService.getAllTontineurs(tontId).subscribe(
            tontpers => {
                this.tontpers = tontpers;
                this.allItems = tontpers;
                this.setPage(1);
                // console.log(" this.allItems = " + JSON.stringify(this.allItems));
            },
            error => { this.alertService.error(error); }
        );
      }

}

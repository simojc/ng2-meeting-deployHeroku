import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../Models/index';
import { AlertService, PersService, PagerService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'pers.component.html',
  styles: []
})

export class PersComponent implements OnInit {
  currentUser: IUser;
  // array of all items to be paged
  private allItems: any[] = [];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  public searchString: string;

  constructor(private alertService: AlertService, private persService: PersService,
    private router: Router, private pagerService: PagerService) {
    }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadMembers();
  }

  private loadMembers() {
    this.persService.getPersByType().subscribe(
      pers => {
        this.allItems = pers;
        this.setPage(1);
      },
      error => { this.alertService.error(error); }
    );
  }

  EditPers(id) {
    this.router.navigate(['/membres/edit', id]);
  }

  addPers() {
    this.router.navigate(['/membres/new']);
  }

  // Nouveau  code pour pagination
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}

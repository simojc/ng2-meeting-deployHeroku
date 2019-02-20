import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IPers } from '../Models/index';
import { AlertService, PersService, PagerService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'membre.component.html',
  styles: []
})

export class MembreComponent implements OnInit {
  currentUser: IUser;
  filteredPers: any[];
  pers: any[] = [];

  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredPers = this.listFilter ? this.performFilter(this.listFilter) : this.pers;
  }

  performFilter(filterBy: string): IPers[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.pers.filter((pers: any) =>
      pers.nom_pers.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      pers.email.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      pers.type.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private alertService: AlertService, private persService: PersService,
    private router: Router, private pagerService: PagerService) {
    }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadMembers();
  }

  private loadMembers() {
    this.persService.getMembres().subscribe(
      pers => {
        this.pers = pers;
        this.filteredPers = pers;
      },
      error => { this.alertService.error(error); }
    );
  }

  EditPers(id) {
    this.router.navigate(['/personnes/edit', id]);
  }

  addPers() {
    this.router.navigate(['/personnes/new']);
  }

  // Nouveau  code pour pagination
/*   setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  } */

}

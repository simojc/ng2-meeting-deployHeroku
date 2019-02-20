import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IPers } from '../../Models/index';
import { AlertService, PersService, PagerService } from '../../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'pers-grid.component.html',
  styles: []
})

export class PersGridComponent implements OnInit {
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
    private router: Router) {
    }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadPers();
  }

  private loadPers() {
    this.persService.getPers().subscribe(
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

}

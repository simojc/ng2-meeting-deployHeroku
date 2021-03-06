import { Component, OnInit } from '@angular/core';

import { IUser } from '../../Models/index';
import { UserService } from '../user.service';
import { AlertService, PagerService } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    currentUser: IUser;
    // array of all items to be paged
    public allItems: any[] = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    public searchString: string;

    filteredUsers: IUser[];
    users: IUser[] = [];

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
    }

    performFilter(filterBy: string): IUser[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.users.filter((users: any) =>
        users.name.toLocaleLowerCase().indexOf(filterBy) !== -1 );   // ||
        // users.admin.toLocaleLowerCase().indexOf(filterBy) !== -1 );
    }

    constructor(private userService: UserService, private router: Router,
        private alertService: AlertService, private pagerService: PagerService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(this.currentUser)
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getUsers().subscribe(
            users => {
                this.users = users;
                this.filteredUsers = users;
               // this.allItems = users;
               // this.setPage(1);
               // console.log(" this.users = " + this.users );
            },
            error => { this.alertService.error(error); }
        );
    }

    Edituser(id) {
        this.router.navigate(['/user/edituser/', id]);
      }

    // Nouveau  code pour pagination
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}

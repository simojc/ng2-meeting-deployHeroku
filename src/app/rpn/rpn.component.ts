import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IRpnpers, IPers } from '../Models/index';
// import { UserService } from '../user.service';
import { AlertService, RpnpersService, AutresService, PagerService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'rpn.component.html',
    styles: []
})

export class RpnpersComponent implements OnInit {
    currentUser: IUser;
    currentPers: IPers;
    // array of all items to be paged
    private allItems: any[] = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private alertService: AlertService, private rpnpersService: RpnpersService,
        private autresService: AutresService, private router: Router, private pagerService: PagerService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.autresService.getPersCurrentPers().subscribe(pers => {
            this.currentPers = pers;
            // console.log(" Ds subscribe this.currentPers.Nom = " + this.currentPers.nom)   
            this.loadRpnPers();
        });
    }
    getMessageStyle(): any {
        return { color: '#ff0000', 'font-weight': 'bold' };
        // On peut assi utiliser des classe de style pour faire la même chose et utiliser dans le template ngClass à la place de ngStyle.
    }

    private loadRpnPers() {

        // console.log(' JSON.stringify(this.currentPers) =   ' + JSON.stringify(this.currentPers))
        if (!!this.currentPers) {
            this.rpnpersService.getAll(this.currentPers[0].id).subscribe(
                rpnpers => {
                    this.allItems = rpnpers;
                    this.setPage(1);
                },
                error => { this.alertService.error(error); }
            );
        }
    }

    // Nouveau  code pour pagination
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    Edit(id) {
        this.router.navigate(['/rpn/edit', id]);
    }

    add() {
        this.router.navigate(['/rpn/new']);
    }

    deleteUser(_id: string) {
        // this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

}

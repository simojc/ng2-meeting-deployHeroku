
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, IGroupe } from '../Models/index';
// import { EventService } from '../events/index';
import { Router } from '@angular/router';
import {  IUser } from '../Models/index';
import {  AlertService } from '../_services/index';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
		.nav.navbar-navbar {font-size: 15px;}
    #searchForm {margin-right: 100px;}
		@media (max-width: 1200px) {#searchForm {display:none}}
		li > a.active { color: #F97924; }
	`]
})

export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  foundSessions: ISession[];
  public currentUser: IUser;
  public groupe: IGroupe;
  title = 'FermatSoft';

  constructor(public auth: AuthService, private router: Router, private alertService: AlertService)  {
  }

  ngOnInit() {
    const thing = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!!thing) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.getGroupe();
    }

  }

  /* searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
       console.log(this.foundSessions);
    });
  } */

  logout() {
    this.currentUser = undefined;
    localStorage.removeItem('currentUser');
    // console.log(' Dans logout1() JSON.stringify(this.currentUser) = ' + JSON.stringify(this.currentUser))
    this.router.navigate(['user/login']);
  }

  private getGroupe() {
    this.auth.getGroupe(this.currentUser.groupe_id).subscribe(
      res => {
        this.groupe = res[0];
        this.title = this.groupe.nom;
      },
      error => { this.alertService.error(error); }
    );
  }

  

}

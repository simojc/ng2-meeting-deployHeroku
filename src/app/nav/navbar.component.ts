
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession } from '../Models/index';
// import { EventService } from '../events/index';
import { Router } from '@angular/router';
import {  IUser } from '../Models/index';

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

  constructor(public auth: AuthService, private router: Router)  {
  }

  ngOnInit() {

    const thing = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!!thing) {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

}

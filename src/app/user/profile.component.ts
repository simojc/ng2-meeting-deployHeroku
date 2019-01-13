import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { IUser, IPers } from '../Models/index';
import { UserService } from './user.service';
import { AlertService, AutresService } from '../_services/index';
import { ToastrService } from '../common/toastr.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
		em {float:right; color: #E05C65; padding-left: 10px;}
        .error input {background-color: #E05C65;}
        .error :: -webkik-input-placeholder {color: #999;} ;
        .error :: -moz-placeholder {color: #999;} ;
        .error : -moz-placeholder {color: #999;} ;
        .error : ms-input-placeholder {color: #999;}
	`]
})
export class ProfileComponent implements OnInit {

  currentUser: IUser;
  currentPers: IPers;
  constructor(private router: Router, private authService: AuthService,
    private userService: UserService, private alertService: AlertService,
    private autresService: AutresService) {
    // console.log(this.currentUser)
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('currentUser = ' + JSON.stringify(this.currentUser));
    this.autresService.getPersCurrentPers().subscribe(pers => {
      this.currentPers = pers[0];
      // console.log(' (currentPers) =   ' + JSON.stringify(this.currentPers));
    });
  }

  convertPassword(motpasse: string) {
    if (!motpasse) { motpasse = 'aaaaaaaaa'; }
    const password = motpasse; // .toString();
    let encryPass = '*';
    for (let i = 0; i < password.length - 1; i++) {
      encryPass = encryPass + '*';
    }
    return encryPass;
  }

  Edit(id) {
    this.router.navigate(['user/changepwd', id]);
  }

}

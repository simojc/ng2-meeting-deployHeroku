import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { AlertService } from '../_services/index';
import { Router } from '@angular/router';

@Component({

  templateUrl: './login.component.html',
  styles: [`
      em { float:right; color:#E05C65; padding-left:10px;}
      .sky{
        background-image:url('http:/assets/images/sky.jpeg');
        background-size: 600px 500px;
      }
      .elph{
        background-image:url('http:/assets/images/elephan.jpeg');
      }

      .afr{
        background-image:url('http:/assets/images/africa.jpeg');
      }

      h1 {text-align:center;}
  `],

})

export class LoginComponent implements OnInit {
  private loading: boolean;
  email: any;
  password: any;
  public mouseoverLogin: boolean;
  public loginInvalid: boolean;

  constructor(private authService: AuthService, private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
   // this.showConnexion = 1;
  }

  login(formValues) {
    this.loading = true;
    this.authService.login(formValues.email, formValues.password)
      .then(
      res => {
        location.reload();
        this.router.navigate(['/user/profile']);

         this.alertService.success(' login complété avec sussès', true);

        this.loading = false;
      },
      err => {
        this.alertService.error(err);
        this.loading = false;
      });
  }

  createuser() {
    this.router.navigate(['user/createuser']);
  }

  cancel() {
    this.router.navigate(['accueil']);
  }

}

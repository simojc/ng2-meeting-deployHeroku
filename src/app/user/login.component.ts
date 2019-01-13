import { Component, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { AlertService } from '../_services/index';
import { Router } from '@angular/router';

@Component({

  templateUrl: './login.component.html',
  styles: [`
			em { float:right; color:#E05C65; padding-left:10px;}
	`]
})

export class LoginComponent {
  private loading: boolean;
  email: any;
  password: any;
  public mouseoverLogin: boolean;
  public loginInvalid: boolean;
  // public formValue: Class;

  constructor(private authService: AuthService, private router: Router,
    private alertService: AlertService) {
  }

  login(formValues) {
    this.loading = true;
    this.authService.loginUser(formValues.email, formValues.password)
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
    this.router.navigate(['/']);
  }
}

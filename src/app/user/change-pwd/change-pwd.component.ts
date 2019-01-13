import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, RpnpersService, AutresService, PersService } from '../../_services/index';
import { IRpnpers, IPers, IUser } from '../../Models/index';
import { UserService } from '../user.service';

@Component({
  selector: 'change-pwd',
  templateUrl: './change-pwd.component.html'
})
export class ChangePwdComponent implements OnInit {
  user: any;

  personnes: IPers[];
  currentUser: IUser;
  angForm: FormGroup;
  title = 'Modifier le mot de passe';
  private loading: boolean;

  @Output() updateUser = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //  console.log("params['id'] = " + params['id']);
      this.userService.getById(params['id']).subscribe(res => {
        // console.log( ' ds ngOnInit ; res.data = ' +  JSON.stringify(res)) ;
        this.user = res[0];
       // console.log(' ds ngOnInit ; this.user = ' + JSON.stringify(this.user));
      });
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(' currentUser = ' + JSON.stringify(this.currentUser));
  }

  createForm() {
    this.angForm = this.fb.group({
      // user_id: ['', Validators.required], Pas besoin du user_id, car le lien entre la personne et le user se fait par le courriel
      email: ['', Validators.required],
      password: [''],
      password_new: ['', Validators.required],
      password_old: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.checkIfMatchingPasswords('password_new', 'confirmPassword'),
    this.checkIfMatchingPasswords('password', 'password_old'),
    this.checkIfDifferentPasswords('password_old', 'password_new')] });
  }

  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  private checkIfDifferentPasswords(password_old: string, password_new: string) {
    return (group: FormGroup) => {
      const passwordOldInput = group.controls[password_old],
      passwordNewInput = group.controls[password_new];
      if (passwordOldInput.value === passwordNewInput.value) {
        return passwordNewInput.setErrors({ identOldNew: true });
      } else {
        return passwordNewInput.setErrors(null);
      }
    };
  }

  changePwd(formValues) {
    this.route.params.subscribe(params => {
      const user = {
        // email: this.currentUser.email,
        password: formValues.password_new,
      };
      this.userService.update(user, params['id'])
      .then(
        res => {
          this.router.navigate(['/user/profile']);
           this.alertService.success(' Mot de passe modifé avec succès', true);
          this.loading = false;
          this.updateUser.emit();
        },
        err => {
          this.alertService.error(err);
          this.loading = false;
        });
    });
  }

  cancel() {
    this.router.navigate(['/user/profile']);
  }
}

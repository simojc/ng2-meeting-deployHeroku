import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, RpnpersService, AutresService, PersService } from '../../_services/index';
import { IRpnpers, IPers, IUser } from '../../Models/index';
import { UserService } from '../user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  user: any;

  personnes: IPers[];
  currentUser: IUser;
  angForm: FormGroup;
  pwdDisabled: boolean = true;
  title = "Modifier le profil d'un utilisateur";
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
      email: [''],
      password: ['', Validators.required],
      admin: [''],
      pwdEnableCheckBx: ['']
      });
    }

  edithUser(formValues) {
    this.route.params.subscribe(params => {
      const user = {
        email: this.currentUser.email,
        password: formValues.password,
        admin: formValues.admin,
       // pwdEnableCheckBx: formValues.pwdEnableCheckBx
      };
     // console.log(" edithUser ;user = " + JSON.stringify(user) );
      this.userService.update(user, params['id'])
        .then(
          res => {
            // this.router.navigate(['/user/profile']);
            this.alertService.success(' Utilisateur modifé avec succès', true);
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
    this.router.navigate(['/user/home']);
  }

  changed(evt) {
    const password_ctrl = this.angForm.get('password');
    // password_ctrl.enabled ? password_ctrl.disable() : password_ctrl.enable();
    if (evt.target.checked) {
      password_ctrl.enable();
      // console.log("Checked");
    } else {
      password_ctrl.disable()
      // console.log("UNChecked");
    }
  }

}



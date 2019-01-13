import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService, PersService, AutresService } from '../../_services/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {   IUser} from '../../Models/index';
import { AuthService } from '../auth.service';

@Component({
  moduleId: module.id,
  templateUrl: 'create-user.component.html'
})
export class CreateUserComponent {

  title = 'Inscription';
  @Output() saveNewUser = new EventEmitter();
  @Output() cancelAddUser = new EventEmitter();
  public loginInvalid: boolean;

  // currentUser: IUser;
  public mouseoverLogin: boolean;
  angForm: FormGroup;
  constructor( private fb: FormBuilder, private router: Router, private autresService: AutresService,
    private alertService: AlertService, private authService: AuthService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
     // user_id: ['', Validators.required], Pas besoin du user_id, car le lien entre la personne et le user se fait par le courriel
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});
  }

  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  addUser(formValues) {
    const user = {
      // id: undefined,
      // user_id: formValues.user_id,  Pas besoin du user_id, car le lien entre la personne et le user se fait par le courriel
     // location_id: formValues.location_id,
     email: formValues.email,
     password: formValues.password,
     admin: false,
    };
    console.log('user = ' + JSON.stringify(user));
    this.authService.addUser(user);
    this.saveNewUser.emit();
     // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    this.router.navigate(['/']);
  }

  cancel() {
    this.cancelAddUser.emit();
    // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    this.router.navigate(['/']);
  }

}

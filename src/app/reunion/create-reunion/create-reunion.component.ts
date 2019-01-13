
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { EvnmtService } from '../shared/index';

import {  AlertService } from '../../_services/index';
import { IGroupe, IUser, IEvnmt } from '../../Models/index';

@Component({

  templateUrl: './create-reunion.component.html',
  styles: [`
  em {float:right; color: #E05C65; padding-left: 10px;}
      .error input {background-color: #E05C65;}
      .error :: -webkik-input-placeholder {color: #999;}
      .error :: -moz-placeholder {color: #999;}
      .error : -moz-placeholder {color: #999;}
      .error : ms-input-placeholder {color: #999;}
`]
})
export class CreateReunionComponent {
  isDirty: boolean = true;
  currentUser: IUser;
  title = "Création d'une réunion";
  evnmt: IEvnmt;
  // locations: ILocation[];
  constructor(private router: Router, private evnmtService: EvnmtService,
    private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  saveEvnmt(formValues) {
    console.log(formValues);
    this.evnmtService.saveEvnmt(formValues).subscribe(evnmt => {
       console.log(formValues);
      this.isDirty = false;
      this.router.navigate(['/reunions']);
    });
  }

  cancel() {
    this.isDirty = false;
    this.router.navigate(['/reunions']);

  }
}

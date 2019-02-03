
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EvnmtService } from '../shared/index';

import {  AlertService } from '../../_services/index';
import { IUser, IEvnmt } from '../../Models/index';

@Component({

  templateUrl: './edit-reunion.component.html',
  styles: [`
  em {float:right; color: #E05C65; padding-left: 10px;}
      .error input {background-color: #E05C65;}
      .error :: -webkik-input-placeholder {color: #999;}
      .error :: -moz-placeholder {color: #999;}
      .error : -moz-placeholder {color: #999;}
      .error : ms-input-placeholder {color: #999;}
`]
})
export class EditReunionComponent implements OnInit {
  isDirty: boolean = true;
  currentUser: IUser;
  evnmt: IEvnmt;
  title = "Modification d'une séance de l'AG";
  // locations: ILocation[];
  constructor(private route: ActivatedRoute, private router: Router, private evnmtService: EvnmtService,
    private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.evnmtService.getEvnmtById(params['id']).subscribe(res => {
        this.evnmt = res[0];
       // console.log(" dans ngOnInit; this.personne = "+  JSON.stringify(this.personne));
      });
    });
  }

  updateEvnmt(formValues) {
    this.route.params.subscribe(params => {
    this.evnmtService.updateEvnmt(formValues, params['id']);
       console.log(formValues);
      this.isDirty = false;
      this.router.navigate(['/reunions/tableau']);
  });
}

  cancel() {
    this.isDirty = false;
    this.router.navigate(['/reunions/tableau']);
  }
}

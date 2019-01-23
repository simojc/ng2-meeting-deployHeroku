import { Component, OnInit } from '@angular/core';
// import { AuthService } from './auth.service';
import { AlertService } from '../_services/index';
import { Router } from '@angular/router';

@Component({

  templateUrl: './accueil.component.html',
  styles: [`
      em { float:right; color:#E05C65; padding-left:10px;}
      .sky{
        background-image:url('http:/assets/images/sky.jpeg');
        background-size: 600px 300px;
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

export class AccueilComponent  {
  private loading: boolean;

  constructor( private router: Router,
    private alertService: AlertService) {
  }

  onClic() {
    this.router.navigate(['user/login']);
  }


}


import { Component, OnInit } from '@angular/core';
import { EvnmtService } from '../../shared/evnmt.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../user/auth.service';

import { IEvnmt, IEvnmtdtl, IUser } from '../../../Models/index';
import { AlertService, EvnmtdtlService } from '../../../_services/index';

@Component({
  templateUrl: './reunion-details.component.html',
  styles: [`
		.container {padding-left:20px; padding-right:20px;}
		.event-image {height: 100px;}
        a {cursor:pointer}
	`]
})

export class EvnmtDetailsComponent implements OnInit {

  evnmt: IEvnmt;
  addMode: boolean;
 // filterBy: string = 'all'
  sortBy: string = 'ordre';
  event_id: number;
  itemCount: number;
  currentUser: IUser;

  constructor(private evnmtService: EvnmtService, private route: ActivatedRoute,
    private evnmtdtlService: EvnmtdtlService,
    private alertService: AlertService,  public auth: AuthService) {
   // console.log("Dans EventDetailsComponent constructor --- params =   ");
    this.route.params.subscribe(params => console.log( params.id));
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.evnmt = this.route.snapshot.data['evnmt'][0];
     // console.log('this.evnmt = ' + JSON.stringify(this.evnmt));
      this.addMode = false;
     //  this.getLocation();
      this.loadEvnmtdtls();
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  addEvnmtdtl() {
    this.addMode = true;
  }

  saveNewReunionItem() {
    this.addMode = false;
   }

   cancelAddReunionItem() {
    this.addMode = false;
  }

  private loadEvnmtdtls() {
    // console.log("rpn.componet this.currentPers = " + this.currentPers.prenom)  
    this.evnmtdtlService.getAll(this.evnmt.id).subscribe(
      evnmtdtls => {
        // console.log(" JSON.stringify(rpnpers) =   "+ JSON.stringify(rpnpers))
        this.evnmt.evnmtdtls = evnmtdtls;
        this.itemCount = this.evnmt.evnmtdtls.length;
      },
      error => { this.alertService.error(error); }
    );
  }

}

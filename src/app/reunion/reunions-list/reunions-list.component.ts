import { Component, OnInit } from '@angular/core';
import { EvnmtService } from '../shared/evnmt.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/index';
import { IEvnmtdtl, IEvnmt, IUser } from '../../Models/index';

@Component({

   template: `
		<div>
			<h1> Les rencontres mensuelles </h1>
			<hr>
				<div class="row">
					<div  *ngFor="let evt of evnmts"  class="col-md-10">
						<reunions-thumbnail  [evnmt]="evt"> </reunions-thumbnail>
					</div>
				</div>
		</div>
		<div style="text-align: right;" class="row">
				<a [routerLink]="['/reunions/new']" >  Créer une réunion </a>
			</div>
		 `
})

export class ReunionsListComponent implements OnInit {
evnmts: IEvnmt[];
public currentUser: IUser;

errorMsg: string;
errorFlag: boolean = false;

constructor(private evnmtService: EvnmtService,
private route: ActivatedRoute, private alertService: AlertService) {
}

ngOnInit() {
this.evnmts = this.route.snapshot.data['evnmts'];
// this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

}


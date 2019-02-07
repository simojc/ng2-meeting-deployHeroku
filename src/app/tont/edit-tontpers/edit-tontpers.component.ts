import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, TontService, AutresService, PersService} from '../../_services/index';
import { ITontpers, ITont, IPers, IUser } from '../../Models/index';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';


@Component({
  selector: 'rpn-tontpers',
  templateUrl: './edit-tontpers.component.html',
})
export class EditTontpersComponent implements OnInit {
  tontpers: any [];
  mat: string;
  personnes: IPers [];
  currentUser: IUser;
  angForm: FormGroup;
  tonts: any;
  title = 'Modifier adhésion tontine';


  constructor(private route: ActivatedRoute, private router: Router,
    private tontService: TontService, private fb: FormBuilder,
    private autresService: AutresService,
    private alertService: AlertService,
    private persService: PersService) {
    this.createForm();
   }

   ngOnInit() {
    this.route.params.subscribe(params => {
       // console.log("params['id'] = " + params['id']);
     this.tontService.getById_uneLigne(params['id']).subscribe(res => {
       // console.log( ' ds ngOnInit ; res.data = ' +  JSON.stringify(res)) ;
       this.tontpers = res[0];
       // console.log(' ds ngOnInit ; this.tontpers = ' +  JSON.stringify(this.tontpers)) ;
     });
   });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.loadPersonnes();
    this.loadTonts();
  }

  createForm() {
    this.angForm = this.fb.group({
      pers_id: ['', Validators.required],
      tont_id: ['', Validators.required],
      position: '',
      alias: ['', Validators.required],
      statut: ['', Validators.required],
      comment: '',
      dt_statut: '',
      moisgain: '',
    });
  }

  updateTontPers(formValues) {
    this.route.params.subscribe(params => {
      const tontpers = {
       groupe_id: this.currentUser.groupe_id,
        pers_id: formValues.pers_id,
        tont_id: formValues.tont_id,
        position: formValues.position,
        alias: formValues.alias,
        statut: formValues.statut,
        dt_statut: formValues.dt_statut,
        moisgain: formValues.moisgain,
        comment: formValues.comment,
        dtdeb: undefined,
        dtfin: undefined,
        cot_dern: undefined,
        descr: undefined,
    };
    this.tontService.updateTontPers(tontpers, params['id']);
    this.router.navigate(['tontpersgrid']);
    });

  }

   private loadPersonnes() {
    this.persService.getPers().subscribe(
      res => {
        // console.log(" loadPersonnes res = "+  JSON.stringify(res)) 
      this.personnes = res;
      // console.log(" loadPersonnes this.personnes = "+  JSON.stringify(this.personnes)) 
     },
      error => { this.alertService.error(error); }
    );
  }

  private loadTonts() {
    this.tontService.getAllTonts().subscribe(
      res => { this.tonts = res; },
      error => { this.alertService.error(error); }
    );
  }

  cancel() {
    this.router.navigate(['tontpersgrid']);
  }


}

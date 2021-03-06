import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, RpnpersService, AutresService, PersService} from '../../_services/index';
import { IRpnpers, IPers, IUser } from '../../Models/index';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';


@Component({
  selector: 'rpn-edit',
  templateUrl: './edit-rpn.component.html',
})
export class EditRpnComponent implements OnInit {
  rpnpers: any;
  mat: string;
  personnes: IPers [];
  currentUser: IUser;
  angForm: FormGroup;
  title = 'Modifier adhésion RPN';


  constructor(private route: ActivatedRoute, private router: Router,
    private rpnpersService: RpnpersService, private fb: FormBuilder,
    private autresService: AutresService,
    private alertService: AlertService,
    private persService: PersService) {
    this.createForm();
   }

   ngOnInit() {
    this.route.params.subscribe(params => {
         // console.log("params['id'] = " + params['id']);
      this.rpnpersService.getById(params['id']).subscribe(res => {
         // console.log( ' ds ngOnInit ; res.data = ' +  JSON.stringify(res)) ;
        this.rpnpers = res[0];
        // console.log(' ds ngOnInit ; this.rpnpers = ' +  JSON.stringify(this.rpnpers)) ;
      });
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadPersonnes() ;
  }

  createForm() {
    this.angForm = this.fb.group({
      pers_id: ['', Validators.required],
      repdt1_id: ['', Validators.required],
      repdt2_id: '',
      dtadh: ['', Validators.required],
      mtrle: ['', Validators.required],
      depot: '',
      dtmajdpt: '',
    });
  }

  updateRpnpers(formValues) {
    this.route.params.subscribe(params => {
      const rpnpers = {
        groupe_id: this.currentUser.groupe_id,
      pers_id: formValues.pers_id,
      repdt1_id: formValues.repdt1_id,
      repdt2_id: formValues.repdt2_id,
      // dtadh:  this.toApiDate (formValues.dtadh),
      dtadh:  formValues.dtadh,
      mtrle: formValues.mtrle,
      depot: formValues.depot,
      dtmajdpt: formValues.dtmajdpt,
    };
    this.rpnpersService.updateRpnpers(rpnpers, params['id']);
    this.router.navigate(['rpngrid']);
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

  cancel() {
    this.router.navigate(['rpngrid']);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, EngmtService, AutresService, PersService} from '../../_services/index';
import { IEngmtpers, IEngmt, IPers, IUser } from '../../Models/index';

@Component({
  selector: 'engmt-edit',
  templateUrl: './edit-engmt.component.html',
})
export class EditEngmtComponent implements OnInit {
  engmtpers: any;
  private loading: boolean;
  engmnts: IEngmt[];
  personnes: IPers [];
  currentUser: IUser;
  angForm: FormGroup;
  butDisabled: boolean = true;
  title = 'Modifier adhésion engagement';


  constructor(private route: ActivatedRoute, private router: Router,
    private engmtService: EngmtService, private fb: FormBuilder,
    private alertService: AlertService,
    private persService: PersService) {
    this.createForm();
   }

   ngOnInit() {
    this.route.params.subscribe(params => {
       //  console.log("params['id'] = " + params['id']);
      this.engmtService.getById_uneLigne(params['id']).subscribe(res => {
        // console.log( ' ds ngOnInit ; res.data = ' +  JSON.stringify(res)) ;
        this.engmtpers = res[0];
        // console.log(' ds ngOnInit ; this.engmtpers = ' +  JSON.stringify(this.engmtpers)) ;
      });
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadPersonnes() ;
    this.loadsEngmts();
  }

  createForm() {
    this.angForm = this.fb.group({
      pers_id: ['', Validators.required],
      engmt_id: ['', Validators.required],
      exercice: ['', Validators.required],
      mont: ['', Validators.required],
      statut: ['', Validators.required],
      dtchgst: '',
      message: '',
      mont_unit: '',
      periodicite: '',
    });
  }

  update(formValues) {
    this.loading = true;
    this.route.params.subscribe(params => {
      const engmtpers = {
        id: undefined,
        groupe_id: this.currentUser.groupe_id,
        pers_id: formValues.pers_id,
        engmt_id: formValues.engmt_id,
        exercice: formValues.exercice,
        mont: formValues.mont,
        statut: formValues.statut,
        dtchgst: formValues.dtchgst,
        message: formValues.message
    };
    this.engmtService.update(engmtpers, params['id']);
    this.alertService.success(' Mise à jour effectuée avec sussès', true);
    this.loading = false;
    // this.router.navigate(['engmt']);
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

  private loadsEngmts() {
    this.engmtService.getAll().subscribe(
      res => {
        this.engmnts = res;
       },
      error => { this.alertService.error(error); }
    );
  }

  cancel() {
    this.router.navigate(['engmtpersgrid']);
  }
}

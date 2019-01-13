import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, TontService, AutresService, PersService } from '../../_services/index';
import { ITont, ITontpers, IPers, IUser } from '../../Models/index';

@Component({
  selector: 'tont-create',
  templateUrl: './create-tontpers.component.html',
  styleUrls: []
})
export class CreateTontPersComponent implements OnInit {

  title = 'Enregistrer un membre à une tontine ';
  tontpers: any;
  personnes: IPers[];
  angForm: FormGroup;
  currentUser: IUser;

  constructor(private route: ActivatedRoute, private router: Router,
    private tontService: TontService, private fb: FormBuilder,
    private autresService: AutresService,
    private alertService: AlertService,
    private persService: PersService ) {
    this.createForm();
  }

  ngOnInit() {
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

  addTontpers(formValues) {
    const tontpers: ITontpers = {
      id: undefined,
      groupe_id: this.currentUser.groupe_id,
      pers_id: formValues.pers_id,
      tont_id: formValues.tont_id,
      position: formValues.position,
      alias: formValues.alias,
      statut: formValues.statut,
      dt_statut: formValues.dt_statut,
      moisgain: formValues.moisgain,
      comment: formValues.moisgain,
      dtdeb: undefined,
      dtfin: undefined,
      cot_dern: undefined,
      descr: undefined,
    };
    this.tontService.create(tontpers);
    // this.router.navigate(['/']);
  }

  private loadPersonnes() {
    this.persService.getAll().subscribe(
      res => { this.personnes = res; },
      error => { this.alertService.error(error); }
    );
  }

  private loadTonts() {
    this.tontService.getAllTonts().subscribe(
      res => { this.tontpers = res; },
      error => { this.alertService.error(error); }
    );
  }

  cancel() {
    // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    this.router.navigate(['rpn']);
  }

}

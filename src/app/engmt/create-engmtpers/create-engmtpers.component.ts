import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, RpnpersService, AutresService, PersService, EngmtService } from '../../_services/index';
import { IEngmt, IPers, IUser, IEngmtpers } from '../../Models/index';

@Component({
  selector: 'engmt-create',
  templateUrl: './create-engmtpers.component.html',
  styleUrls: []
})
export class CreateEngmtPersComponent implements OnInit {

  title = 'Enregistrer un membre à un engagement';
  personnes: IPers[];
  engmnts: IEngmt[];
  angForm: FormGroup;
  currentUser: IUser;
  private loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
     private fb: FormBuilder,
    private autresService: AutresService,
    private alertService: AlertService,
    private persService: PersService, private engmtService:EngmtService) {
    this.createForm();
  }

  ngOnInit() {
   // this.loadLocations();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadPersonnes();
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

  addEngmtpers(formValues) {
    this.loading = true;
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
    this.engmtService.addEngmtpers(engmtpers);
    // this.saveNewPersonne.emit();
     // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    // this.router.navigate(['/']);
    this.alertService.success(' Engagement créé avec sussès', true);
    this.loading = false;
  }

  private loadPersonnes() {
    this.persService.getPers().subscribe(
      res => { this.personnes = res; },
      error => { this.alertService.error(error); }
    );
  }

    private loadsEngmts() {
      this.engmtService.getAll().subscribe(
        res => { this.engmnts = res; },
        error => { this.alertService.error(error); }
      );
    }

    selectchange(args) {
      const engmt_Selected = this.engmnts.find(u => u.id === +args.target.value);
      const mont_unit_ctrl = this.angForm.get('mont_unit');
      mont_unit_ctrl.setValue(engmt_Selected.mont_unit);

      const priodicite_ctrl = this.angForm.get('periodicite');
      priodicite_ctrl.setValue(engmt_Selected.periodicite);

    }

  cancel() {
    // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    this.router.navigate(['/']);
  }

}

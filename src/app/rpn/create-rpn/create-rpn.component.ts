import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, RpnpersService, AutresService, PersService } from '../../_services/index';
import { IRpnpers, IPers, IUser } from '../../Models/index';

@Component({
  selector: 'rpn-create',
  templateUrl: './create-rpn.component.html',
  styleUrls: []
})
export class CreateRpnComponent implements OnInit {
  title = 'Nouvelle adhésion RPN';
  rpnpers: any;
  personnes: IPers[];
  angForm: FormGroup;
  currentUser: IUser;
  @Output() saveNewRpnpers = new EventEmitter();
  @Output() cancelAddRpnpers = new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router,
    private rpnpersService: RpnpersService, private fb: FormBuilder,
    private autresService: AutresService,
    private alertService: AlertService,
    private persService: PersService) {
    this.createForm();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadPersonnes();
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

  addRpnpers(formValues) {
    const rpnpers = {
      id: undefined,
      groupe_id: this.currentUser.groupe_id,
      pers_id: formValues.pers_id,
      repdt1_id: formValues.repdt1_id,
      repdt2_id: formValues.repdt2_id,
      dtadh: formValues.dtadh,
      mtrle: formValues.mtrle,
      depot: formValues.depot,
      dtmajdpt: formValues.dtmajdpt
    };
    this.rpnpersService.addRpnpers(rpnpers);
    // console.log('ds component: rpnpers = ' + JSON.stringify(rpnpers));
    this.saveNewRpnpers.emit();
    this.router.navigate(['rpngrid']);
  }

  private loadPersonnes() {
    this.persService.getPers().subscribe(
      res => { this.personnes = res; },
      error => { this.alertService.error(error); }
    );
  }

  cancel() {
    this.router.navigate(['rpngrid']);
  }

}

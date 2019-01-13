import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService, PersService, AutresService } from '../../_services/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPers, TypePers,  IUser} from '../../Models/index';

@Component({
  selector: 'pers-create',
  templateUrl: './create-pers.component.html',
  styleUrls: []
})
export class CreatePersComponent implements OnInit {

  title = "Création d'une personne";
  @Output() saveNewPersonne = new EventEmitter();
  @Output() cancelAddPersonne = new EventEmitter();
  typePers = TypePers;
  currentUser: IUser;

  angForm: FormGroup;
  constructor(private persService: PersService, private fb: FormBuilder, private router: Router, private autresService: AutresService,
    private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
   // this.loadLocations();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('this.currentUser= ' + JSON.stringify(this.currentUser));
  }

  createForm() {
    this.angForm = this.fb.group({
     // user_id: ['', Validators.required], Pas besoin du user_id, car le lien entre la personne et le user se fait par le courriel
      type: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      email: ['', Validators.required, Validators.email ],
      telcel: '',
      telres: '',
      emploi: '',
      dom_activ: '',
      titre_adh: '',
      address: ['', Validators.required],
      city: '',
      country: ''
    });
  }

  addPersonne(formValues) {
    const personne: IPers = {
      id: undefined,
      // user_id: formValues.user_id,  Pas besoin du user_id, car le lien entre la personne et le user se fait par le courriel
     // location_id: formValues.location_id,
      address: formValues.address,
      city: formValues.city,
      country: formValues.country,
      type: formValues.type,
      nom: formValues.nom,
      prenom: formValues.prenom,
      sexe: formValues.sexe,
      email: formValues.email,
      telcel: formValues.telcel,
      telres: formValues.telres,
      emploi: formValues.emploi,
      dom_activ: formValues.dom_activ,
      titre_adh: formValues.titre_adh,
      groupe_id: this.currentUser.groupe_id
    };
    console.log('personne = ' + JSON.stringify(personne));
    this.persService.addPersonne(personne);
    this.saveNewPersonne.emit();
     // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    this.router.navigate(['membres']);
  }

  cancel() {
    this.cancelAddPersonne.emit();
    // Exécuter l'un ou l'autre de ces 2 instructions, pas les 2
    this.router.navigate(['membres']);
  }

}

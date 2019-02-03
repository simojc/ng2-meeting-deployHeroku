
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvnmtdtl, IUser} from '../../../Models/index';
import { restrictedWords } from '../../../_directives/index';
import { AutresService, AlertService, EvnmtdtlService } from '../../../_services/index';

@Component({
  selector: 'edit-reuniondtl',
  templateUrl: './edit-reuniondtl.component.html',
  styles: [`
  em {float:right; color: #E05C65; padding-left: 10px;}
      .error input, .error select, .error textarea {background-color: #E05C65;}
      .error :: -webkik-input-placeholder {color: #999;}
      .error :: -moz-placeholder {color: #999;}
      .error : -moz-placeholder {color: #999;}
      .error : ms-input-placeholder {color: #999;}
`]
})

export class EditReuniondtlComponent implements OnInit {
  isDirty: boolean = true;
  currentUser: IUser;
  evnmtdtl: IEvnmtdtl;
  title = "Modification détail réunion";
  // locations: ILocation[];
  constructor(private route: ActivatedRoute, private router: Router,
    private alertService: AlertService, private evnmtdtlService: EvnmtdtlService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.evnmtdtlService.getEvnmtdtl(params['id']).subscribe(res => {
        this.evnmtdtl = res[0];
       // console.log(" dans ngOnInit; this.personne = "+  JSON.stringify(this.personne));
      });
    });
  }

  saveEvnmtdtl(formValues) {
    this.route.params.subscribe(params => {
    this.evnmtdtlService.updateEvnmtdtl(formValues, params['id']);
       console.log(JSON.stringify( formValues));
      this.isDirty = false;
      // this.router.navigate(['/reunions/', this.evnmtdtl.evnmt_id]);
  });
}

  cancel() {
    this.isDirty = false;
    this.router.navigate(['/reunions/', this.evnmtdtl.evnmt_id]);
  }
}

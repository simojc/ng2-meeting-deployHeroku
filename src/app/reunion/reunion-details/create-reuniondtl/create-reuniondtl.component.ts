
import { Component, Input, Output , EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IEvnmtdtl} from '../../../Models/index';

import { restrictedWords } from '../../../_directives/index';
import { AutresService, AlertService, EvnmtdtlService } from '../../../_services/index';


@Component({
  selector: 'create-reuniondtl',
  templateUrl: './create-reuniondtl.component.html',
  styles: [`
  em {float:right; color: #E05C65; padding-left: 10px;}
      .error input, .error select, .error textarea {background-color: #E05C65;}
      .error :: -webkik-input-placeholder {color: #999;}
      .error :: -moz-placeholder {color: #999;}
      .error : -moz-placeholder {color: #999;}
      .error : ms-input-placeholder {color: #999;}
`]
})
export class CreateReuniondtlComponent  {
  isDirty: boolean = true;
  @Output() saveNewReunionItem = new EventEmitter();
  @Output() cancelAddReunionItem = new EventEmitter();

  @Input() evnmtId: number;

  evnmtdtl: IEvnmtdtl;

  // locations: ILocation[];
  constructor(private router: Router, private evnmtdtlService: EvnmtdtlService,
    private autresService: AutresService,
    private alertService: AlertService) {
  //  this.loadLocations();
  }

  saveEvnmtdtl(formValues) {
     this.evnmtdtlService.saveEvnmtdtl(formValues).subscribe(evnmt => {
      // console.log(formValues);
      this.isDirty = false;
      // this.router.navigate(['/evnmtdtls'])
    });
    this.saveNewReunionItem.emit();
  }

  cancel() {
    this.cancelAddReunionItem.emit();
  }
}


import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IEvnmt } from '../../Models/index';
// import { EvnmtService } from '../shared/evnmt.service'
// import { AlertService } from '../../_services/index';

@Component({
  selector: 'reunions-thumbnail',
  templateUrl: './reunions-thumbnail.component.html',
  styles: [`
		.thumbnail {min-height: 201px;}
		.pad-left {margin-left: 10px;}
		.well div {color: #bbb;}
	`]
})

export class ReunionsThumbnailComponent {

  // @Input() evnmt: IEvnmt
  _evnmt: IEvnmt;

  constructor(  private router: Router, private route: ActivatedRoute) {
    // this.route.params.subscribe(params => console.log(params));
  }

  @Input()
  set evnmt(w_evnmt: IEvnmt) {
    this._evnmt = w_evnmt;
  }

  get evnmt() {
    return this._evnmt;
  }

}

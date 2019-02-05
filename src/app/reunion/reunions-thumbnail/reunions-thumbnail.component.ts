
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

export class ReunionsThumbnailComponent implements OnInit {

  // @Input() evnmt: IEvnmt
  _evnmt: IEvnmt;

  today: string;
  now: Date = new Date();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
      // const now: Date = new Date();
      this.today = this.now.toISOString();
  }

  @Input()
  set evnmt(w_evnmt: IEvnmt) {
    this._evnmt = w_evnmt;
  }

  get evnmt() {
    return this._evnmt;
  }

  datecompare(date1, date2) {
    const day1 = date1.getDate();
    const mon1 = date1.getMonth();
    const year1 = date1.getFullYear();
    const day2 = date2.getDate();
    const mon2 = date2.getMonth();
    const year2 = date2.getFullYear();

    if (year1 > year2) {
      return true;
    }
    else if (year1 === year2 && mon1 > mon2) {
      return true;
    }
    else if (year1 === year2 && mon1 === mon2 && day1 > day2) {
      return true;
    }
    else {
      return false;
    }
  }

}

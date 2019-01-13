
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEngmtpers } from '../../Models/index';
@Component({
  selector: 'engmt-thumbnail',
  templateUrl: './engmt-thumbnail.component.html',
  styles: [`
		.thumbnail {min-height: 201px;}
		.pad-left {margin-left: 10px;}
		.well div {color: #bbb;}
	`]
})

export class EngmtThumbnailComponent {
  @Input() engmt: IEngmtpers;
  constructor(private router: Router, private route: ActivatedRoute) {
   // this.route.params.subscribe(params => console.log(params));
  }

  getStartTimeStyle(): any {
    const today = new Date();
    const dt_ech = new Date(this.engmt.dt_ech);
    if (this.engmt && dt_ech < today ) {
      return {color: '#003300', 'font-weight': 'bold' }
    }
    return {};
    /// On peut assi utiliser des classe de style pour faire la même chose et utiliser dans le template ngClass à la place de ngStyle.
  }

    goDetail(id: number) {
      this.router.navigate(['/', id]);
      // this.router.navigate(['events', { id: id }]);
    }

}




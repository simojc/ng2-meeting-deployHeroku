import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  template: `<h2> Page non trouvée. </h2>
             <div>
                <button (click)="goBack()"> <font color="#ED7F10"> Retour à la page précedente  </font> </button>
	     </div>
        `
})
export class PageNotFoundComponent {
constructor(private location: Location) { }
goBack(): void {
          this.location.back();
        }
}

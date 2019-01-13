import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
 
import { AlertService } from '../_services/index';
 
@Component({
    selector: 'footer',
    template: `
     
    <div style="text-align: center;" class="row">
    <hr />
      <span >
        &copy; Copyright 2018, Fermat Soft. Tous droits réservés.
      </span>
   </div>
  `,
})
 
export class FooterComponent  {

}

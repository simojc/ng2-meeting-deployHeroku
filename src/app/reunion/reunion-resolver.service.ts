
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { EvnmtService } from './shared/index';

@Injectable()
export class EvnmtResolver implements Resolve<any> {

  constructor(private evnmtService: EvnmtService) {
      }

      resolve(route: ActivatedRouteSnapshot) {
       //  console.log("Dans  EventResolver  route.params['id'] =  " + route.params['id']);
        return this.evnmtService.getEvnmt(route.params['id']);
      }

}

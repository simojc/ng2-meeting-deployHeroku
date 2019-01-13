
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EvnmtService } from './shared/index';

@Injectable()
export class EvnmtListResolver implements Resolve<any> {
  constructor(private evnmtService: EvnmtService)  {
}

  resolve() {
    return this.evnmtService.getEvnmts();
  }

}

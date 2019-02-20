import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../_services/index';
import { isError } from 'util';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private injector: Injector) { }
    handleError(error: Error | HttpErrorResponse) {
      const router = this.injector.get(Router);
      const alertService = this.injector.get(AlertService);
      console.log('URL: ' + router.url);

      console.log('error: ' + error);

      if (error instanceof HttpErrorResponse) {
          // Backend returns unsuccessful response codes such as 404, 500 etc.
          console.error('Backend returned status code: ', error.status);
         // console.error('Response body:', error.message);
          console.log(' error Backend  = ' + JSON.stringify(error));
          alertService.error(error.error);
      } else {
          // A client-side or network error occurred.
           const plainText = error['_body'].replace(/<[^>]*>/g, '');   // .text().replace(/<[^>]*>/g, '');
           console.log('plainText = ' + plainText);
           alertService.error(plainText);
      }
     // router.navigate(['/error']);
    }
}

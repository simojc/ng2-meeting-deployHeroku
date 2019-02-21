import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../_services/index';
// import { isError } from 'util';


@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error: any) {
      const router = this.injector.get(Router);
      console.log('URL: ' + router.url);

      if (error instanceof HttpErrorResponse) {
          // Backend returns unsuccessful response codes such as 404, 500 etc.				  
          console.error('Backend returned status code: ', error.status);
          console.error('Response body:', error.message);
      } else {
          // A client-side or network error occurred.
          console.error('An error occurred:', error.message);

         // const plainText = error['_body'].replace(/<[^>]*>/g, '');   // .text().replace(/<[^>]*>/g, '');
         // console.log('plainText = ' + plainText);
      }
     // router.navigate(['/error']);
    }
}



import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { IEvnmt, IEvnmtdtl } from '../../Models/index';
import { AuthService } from '../../user/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class EvnmtService {

  // private endpointUrl = environment.API_URL;
  private endpointUrl = environment.API_URL_NODEJS;

  constructor( private http: Http, private auth: AuthService) {
}

  token = this.auth.getToken();
  httpOptions = {
     headers: new Headers({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + JSON.parse(this.token)
     })
 };

  getEvnmts(): Observable<IEvnmt[]> {
    return this.http.get(this.endpointUrl + 'evnmts')
      .map((response: Response) => <IEvnmt[]>response.json())
      //  .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEvnmt(id: number): Observable<IEvnmt> {
    return this.http.get(this.endpointUrl + 'evnmts/' + id).map((response: Response) => {
      return <IEvnmt>response.json();
    }).catch(this.handleError);
  }

  saveEvnmt(evnmt): Observable<IEvnmt> {
    console.log(this.endpointUrl + 'evnmts,' + JSON.stringify(evnmt));
    return this.http.post(this.endpointUrl + 'evnmts', JSON.stringify(evnmt),
    this.httpOptions).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  delete(_id: string) {
    return this.http.delete(this.endpointUrl + '/evnmts/' + _id);
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, IEvnmt, IEvnmtdtl } from '../Models/index';
import { AlertService } from '../_services/index';
// import { AuthService } from './auth.service'
import { environment } from '../../environments/environment';

@Injectable()
export class EvnmtdtlService {

  // private endpointUrl = environment.API_URL;
  private endpointUrl = environment.API_URL_NODEJS;

  constructor(private http: Http) { }

  getAll(EvnmtId: number): Observable<IEvnmtdtl[]> {
    console.log(this.endpointUrl + 'evnmtdtls?evnmt_id=' + EvnmtId);
    return this.http.get(this.endpointUrl + 'evnmtdtls?evnmt_id=' + EvnmtId)
      .map((response: Response) => <IEvnmtdtl[]>response.json())
      //  .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEvnmtdtl(id: number): Observable<IEvnmt> {
    return this.http.get(this.endpointUrl + 'evnmtdtls/' + id).map((response: Response) => {
      return <IEvnmt>response.json();
    }).catch(this.handleError);
  }

  saveEvnmtdtl(evnmtdtl): Observable<IEvnmtdtl> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.endpointUrl + 'evnmtdtls', JSON.stringify(evnmtdtl),
      options).map((response: Response) => {
        console.log(' Creation reussi: response  ' + response);
        return response.json();
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}

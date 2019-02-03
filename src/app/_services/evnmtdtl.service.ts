import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, IEvnmt, IEvnmtdtl } from '../Models/index';
import { AlertService } from '../_services/index';
import { AuthService } from '../user/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class EvnmtdtlService {

  // private endpointUrl = environment.API_URL;
  private endpointUrl = environment.API_URL_NODEJS;

  token = this.auth.getToken();
  httpOptions = {
     headers: new Headers({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + JSON.parse(this.token)
     })
 };

  constructor(private http: Http, private auth: AuthService) { }

  getAll(EvnmtId: number): Observable<IEvnmtdtl[]> {
    console.log(this.endpointUrl + 'evnmtdtls?evnmt_id=' + EvnmtId);
    return this.http.get(this.endpointUrl + 'evnmtdtls?evnmt_id=' + EvnmtId, this.httpOptions)
      .map((response: Response) => <IEvnmtdtl[]>response.json())
      //  .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEvnmtdtl(id: number): Observable<IEvnmt> {
    return this.http.get(this.endpointUrl + 'evnmtdtls/' + id, this.httpOptions).map((response: Response) => {
      return <IEvnmt>response.json();
    }).catch(this.handleError);
  }

  saveEvnmtdtl(evnmtdtl): Observable<IEvnmtdtl> {
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post(this.endpointUrl + 'evnmtdtls', JSON.stringify(evnmtdtl),
    this.httpOptions).map((response: Response) => {
        console.log(' Creation reussi: response  ' + response);
        return response.json();
      }).catch(this.handleError);
  }

  updateEvnmtdtl(evnmtdtl, id) {
    const uri = this.endpointUrl + 'evnmtdtls/' + id;
    console.log('uri = ' + JSON.stringify(uri));
    this
      .http
      .put(uri, evnmtdtl, this.httpOptions)
      .subscribe(res => console.log('Done'));
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 import {Observable} from 'rxjs/Observable';
import { IUser, IRpnpers, IPers } from '../Models/index';
import { AlertService } from './alert.service';
import {  AutresService } from './autres.service';
import { AuthService } from '../user/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RpnpersService {

    constructor(private http: Http, private httpClient: HttpClient, private auth: AuthService, private autresService: AutresService) {
    }

    token = this.auth.getToken();
    httpOptions = {
       headers: new Headers({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + JSON.parse(this.token)
       })
   };
    // private endpointUrl = environment.API_URL;
    private endpointUrl = environment.API_URL_NODEJS;

    getAll(resp_id: number) {
      // console.log(this.endpointUrl + 'rpnpers?resp_id = ' + resp_id);
      // return this.httpClient.get<IRpnpers[]>(this.endpointUrl + 'rpnpers?resp_id=' + resp_id);

      return this.http.get(this.endpointUrl + 'rpnpers?resp_id=' + resp_id, this.httpOptions)
      .map((response: Response) => <IRpnpers[]>response.json())
      .catch(this.handleError);
    }


    addRpnpers(rpnpers) {
      const uri = this.endpointUrl + 'rpnpers';
      this.http.post(uri, rpnpers, this.httpOptions).subscribe(
        res => console.log('Creation reussi'));
    }

    editRpnpers(id) {
      const uri = this.endpointUrl + 'rpnpers/' + id;
       console.log(uri);
      return this
        .http
        .get(uri, this.httpOptions)
        .map(res => {
            console.log(" ds service editRpnpers; res = " + JSON.stringify(res)) ;
          return res;
        });
    }

 /*    getById(_id: number) {
        // return this.httpClient.get<IPers>(this.endpointUrl + 'pers/' + _id);
        return this.http.get(this.endpointUrl + 'rpnpers/' + _id, this.httpOptions);
      } */

      getById(_id: number) {
        // return this.httpClient.get<IPers>(this.endpointUrl + 'pers/' + _id);

        return this.http.get(this.endpointUrl + 'rpnpers/' + _id, this.httpOptions)
        .map((response: Response) => <IRpnpers>response.json())
        .catch(this.handleError);
      }

    updateRpnpers(rpnpers, id) {
      console.log(' dans updateRpnpers; rpnpers = ' + JSON.stringify(rpnpers));
      const uri = this.endpointUrl + 'rpnpers/' + id;
      this
        .http
        .put(uri, rpnpers, this.httpOptions)
        .subscribe(res => console.log('Done'));
    }

    private handleError(error: Response) {
        return Observable.throw(error);
      }

    delete(_id: string) {
        return this.http.delete(this.endpointUrl + 'rpnpers/' + _id, this.httpOptions);
    }

}

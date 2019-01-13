import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Observable';
import { IUser, IEngmt , IEngmtpers} from '../Models/index';
import { AlertService } from '../_services/index';
import { AuthService } from '../user/auth.service';

import { environment } from '../../environments/environment';

@Injectable()
export class EngmtService  {
    currentUser: IUser;
    constructor(private httpClient: HttpClient, private http: Http, private auth: AuthService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

    getAll() {
       // return this.httpClient.get<IEngmt[]>(this.endpointUrl + 'engmts');
      return this.http.get(this.endpointUrl + 'engmts', this.httpOptions)
      .map((response: Response) => <IEngmt[]>response.json())
      .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
      }

    getById(_id: number) {
      // return this.httpClient.get<IEngmt>(this.endpointUrl + 'engmts/' + _id);
      return this.http.get(this.endpointUrl + 'engmts/' + _id, this.httpOptions)
      .map((response: Response) => <IEngmt[]>response.json())
      .catch(this.handleError);
    }

    addEngmtpers(engmtpers) {

        const uri = this.endpointUrl + 'engmtpers';
        console.log('addEngmtpers uri =' + uri);
        console.log('addEngmtpers engmtpers =' + JSON.stringify(engmtpers));
        this.http.post(uri, engmtpers, this.httpOptions).subscribe(
          res => console.log('Creation reussi engmtpers' ));
      }

    getAllEngmtPers(pers_id: number) {
      // return this.httpClient.get<IEngmtpers[]>(this.endpointUrl + 'engmtpers/' + pers_id);
      console.log('URL = ' + this.endpointUrl + 'engmtpers/' + pers_id + '?groupe=' + this.currentUser.groupe_id);
      return this.http.get(this.endpointUrl + 'engmtpers/' + pers_id + '?groupe=' + this.currentUser.groupe_id, this.httpOptions)
      .map((response: Response) => <IEngmt[]>response.json())
      .catch(this.handleError);
    }

    getAllEngmt() {
        // return this.httpClient.get<IEngmtpers[]>(this.endpointUrl + 'engmtpers/' + pers_id);
        console.log('URL = ' + this.endpointUrl + 'engmtpers?groupe=' + this.currentUser.groupe_id );
        // this.endpointUrl + 'pers?type=M&groupe=' + this.currentUser.groupe_id
        return this.http.get(this.endpointUrl + 'engmtpers?groupe=' + this.currentUser.groupe_id, this.httpOptions)
        .map((response: Response) => <IEngmtpers[]>response.json())
        .catch(this.handleError);
      }
    create(engmt: IEngmt) {
        return this.http.post(this.endpointUrl + 'engmtpers/', engmt);
    }

    update(engmt: IEngmt) {
        return this.http.put(this.endpointUrl + 'engmtpers/' + engmt.id, engmt);
    }

    delete(_id: string) {
        return this.http.delete(this.endpointUrl + 'engmtpers/' + _id);
    }
}

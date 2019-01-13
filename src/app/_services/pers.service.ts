import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { IUser, IPers } from '../Models/index';
import { AlertService } from '../_services/index';
import { AuthService } from '../user/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class PersService {
    currentUser: IUser;
    constructor(private http: Http, private httpClient: HttpClient, private auth: AuthService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    token = this.auth.getToken();
    httpOptions = {
       headers: new Headers({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + JSON.parse(this.token)
       })
   };
    // private endpointUrl_PHP = environment.API_URL;
    private endpointUrl = environment.API_URL_NODEJS; // prob de CORS

    getAll() {
      // return this.httpClient.get<IPers[]>(this.endpointUrl + 'pers');

      return this.http.get(this.endpointUrl + 'pers', this.httpOptions)
        .map((response: Response) => <IPers[]>response.json())
        .catch(this.handleError);
    }

    getPersByMail(): Observable<IPers> {
        /* return this.http.get(this.endpointUrl + 'pers?email=' + this.currentUser.email)
        .map((response: Response) =>  {
           return response;
        })
        .catch(this.handleError); */

        return this.http.get(this.endpointUrl + 'pers?email=' + this.currentUser.email, this.httpOptions)
        .map((response: Response) => <IPers>response.json())
        .catch(this.handleError);

      }

      getPersByType(): Observable<IPers[]> {
     /*    return this.http.get(this.endpointUrl + 'pers?type=M&groupe=' + this.currentUser.groupe_id)
        .map((response: Response) =>  {
           return response;
        })
        .catch(this.handleError); */
        return this.http.get(this.endpointUrl + 'pers?type=M&groupe=' + this.currentUser.groupe_id, this.httpOptions)
        .map((response: Response) => <IPers[]>response.json())
        .catch(this.handleError);
      }

    getPersByRepdt(repdt_id: number) {
     // return this.httpClient.get<IPers>(this.endpointUrl + 'pers/' + repdt_id);
      return this.http.get(this.endpointUrl + 'pers/' + repdt_id, this.httpOptions)
      .map((response: Response) => <IPers[]>response.json())
      .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
      }

    getById(_id: number) {
      // return this.httpClient.get<IPers>(this.endpointUrl + 'pers/' + _id);
      return this.http.get(this.endpointUrl + 'pers/' + _id, this.httpOptions)
      .map((response: Response) => <IPers>response.json())
      .catch(this.handleError);
    }

    addPersonne(personne: IPers) {
      const uri = this.endpointUrl + 'pers';
      this.http.post(uri, personne, this.httpOptions).subscribe(
        res => console.log('Creation reussi'));
    }

    editPersonne(id) {
      const uri = this.endpointUrl + 'pers/' + id;
       console.log('uri= ' + uri);
      return this
        .http
        .get(uri, this.httpOptions)
        .map(res => {
          console.log('this.httpOptions ' + JSON.stringify(this.httpOptions) );
          return res;
        });
    }

    updatePersonne(personne, id) {
      const uri = this.endpointUrl + 'pers/' + id;
     // console.log('uri = '+JSON.stringify(uri))
      this
        .http
        .put(uri, personne, this.httpOptions)
        .subscribe(res => console.log('Done'));
    }

    deletePersonne(id) {
      const uri = this.endpointUrl + 'pers/delete/' + id;
      return this
        .http
        .delete(uri, this.httpOptions)
        .map(res => {
          return res;
        });
    }
}

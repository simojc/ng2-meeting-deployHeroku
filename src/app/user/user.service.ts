import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { IUser } from '../Models/index';
import { AlertService } from '../_services/index';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Console } from '@angular/core/src/console';

@Injectable()
export class UserService {
    currentUser: IUser;

    token = this.auth.getToken();
    httpOptions = {
       headers: new Headers({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + JSON.parse(this.token)
       })
   };

    constructor(private httpClient: HttpClient, private http: Http, private auth: AuthService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

/*     constructor(private http: Http, private httpClient: HttpClient, private auth: AuthService, private autresService: AutresService) {
    } */
    // private endpointUrl = environment.API_URL;
    private endpointUrl = environment.API_URL_NODEJS; // prob de CORS en dev.


    getUsers(): Observable<IUser[]> {
        const token = this.auth.getToken();
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(token)
            })
        };
       // console.log('URL = ' + this.endpointUrl + 'users');
        return this.http.get(this.endpointUrl + 'users', httpOptions)
            .map((response: Response) => <IUser[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

  /*   getById(_id: string) {
        return this.http.get(this.endpointUrl + 'users/' + _id);
    } */
    getById(_id: number) {
        return this.http.get(this.endpointUrl + 'users/' + _id, this.httpOptions)
        .map((response: Response) => <IUser>response.json())
        .catch(this.handleError);
      }

    create(user: IUser) {
        return this.http.post(this.endpointUrl + 'signup', user);
    }

  /*   update(user: IUser) {
        return this.http.put(this.endpointUrl + '/users/' + user.id, user);
    } */

    update(user, id) {
        // console.log("user = " + JSON.stringify(user));
        return new Promise((resolve, reject) => {
        const uri = this.endpointUrl + 'users/' + id;
        this.http.put(uri, user, this.httpOptions)
        .catch((err: Response) => {
            return Observable.throw(err);
          })
          .subscribe(res => { resolve(res); });
      });
    }

    delete(_id: string) {
        return this.http.delete(this.endpointUrl + '/users/' + _id);
    }
}

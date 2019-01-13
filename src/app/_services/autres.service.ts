import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, IGroupe, IPers } from '../Models/index';
// import { AlertService } from '../_services/index';
import { AuthService } from '../user/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AutresService {
    currentUser: IUser;

    token = this.auth.getToken();
    httpOptions = {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(this.token)
        })
    };

    constructor(private http: Http, private httpClient: HttpClient, private auth: AuthService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    private endpointUrl = environment.API_URL_NODEJS;

    getGroupes() {
        // return this.httpClient.get<IGroupe[]>(this.endpointUrl + 'groupes');
        return this.http.get(this.endpointUrl + 'groupes', this.httpOptions)
            .map((response: Response) => <IGroupe[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

    getGroupeById(_id: number) {
        // return this.httpClient.get(this.endpointUrl + 'groupes/' + _id);
        return this.http.get(this.endpointUrl + 'groupes/' + _id, this.httpOptions)
            .map((response: Response) => <IGroupe>response.json())
            .catch(this.handleError);
    }

    getPersCurrentPers() {
        // console.log('getPersCurrentPers this.currentUser.email =' + this.currentUser.email);
        return this.http.get(this.endpointUrl + 'pers?email=' + this.currentUser.email, this.httpOptions)
            .map((response: Response) => <IPers>response.json())
            .catch(this.handleError);
    }

}

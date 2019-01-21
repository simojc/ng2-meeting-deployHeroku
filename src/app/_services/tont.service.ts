import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, ITont, ITontpers } from '../Models/index';
import { AlertService } from '../_services/index';
import { AuthService } from '../user/auth.service';
import { AutresService } from './autres.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TontService {
    currentUser: IUser;
    constructor(private http: Http, private httpClient: HttpClient,
        private auth: AuthService, private autresService: AutresService) {
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
        // return this.httpClient.get<ITont[]>(this.endpointUrl + 'tontpers');
        return this.http.get(this.endpointUrl + 'tontpers', this.httpOptions)
            .map((response: Response) => <ITont[]>response.json())
            .catch(this.handleError);
    }

    getAllTonts() {
        // return this.httpClient.get<ITont[]>(this.endpointUrl + 'tontpers');
        return this.http.get(this.endpointUrl + 'tonts', this.httpOptions)
            .map((response: Response) => <ITont[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

    getById(_id: number) {
       // console.log('URL = ' + this.endpointUrl + 'tontpers?groupe=' + this.currentUser.groupe_id + '&tont_id=' + +_id );
        return this.http.get(this.endpointUrl + 'tontpers/' + _id + '?groupe=' + this.currentUser.groupe_id, this.httpOptions)
            .map((response: Response) => <ITontpers>response.json())
            .catch(this.handleError);
    }

    getById_uneLigne(_id: number) {
        return this.http.get(this.endpointUrl + 'unetontpers/' + _id, this.httpOptions)
        .map((response: Response) => <ITontpers>response.json())
        .catch(this.handleError);
      }

    getAllTontineurs(tont_id: number) {
       // return this.httpClient.get<IEngmtpers[]>(this.endpointUrl + 'engmtpers/' + pers_id);
      // console.log('URL = ' + this.endpointUrl + 'tontpers?groupe=' + this.currentUser.groupe_id + '&tont_id=' + +tont_id );
       // this.endpointUrl + 'pers?type=M&groupe=' + this.currentUser.groupe_id
       return this.http.get(this.endpointUrl + 'tontpers?groupe=' + this.currentUser.groupe_id + '&tont_id=' + +tont_id, this.httpOptions)
       .map((response: Response) => <ITontpers[]>response.json())
       .catch(this.handleError);
    }

    create(tontpers: ITontpers) {
        const uri = this.endpointUrl + 'tontpers';
        this.http.post(uri, tontpers, this.httpOptions).subscribe(
          res => console.log('Creation reussi tontpers'));
      }

    updateTontPers(tontpers, id) {
        // console.log(' dans service; tontpers = ' + JSON.stringify(tontpers));
        const uri = this.endpointUrl + 'tontpers/' + id;
        this
          .http
          .put(uri, tontpers, this.httpOptions)
          .subscribe(res => console.log('Done'));
      }

    delete(_id: string) {
        return this.http.delete(this.endpointUrl + 'tontpers/' + _id, this.httpOptions)
            .map((response: Response) => <ITontpers>response.json())
            .catch(this.handleError);
    }
}

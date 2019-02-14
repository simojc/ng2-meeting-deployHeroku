import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { tokenNotExpired } from 'angular2-jwt';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser, IGroupe } from '../Models/index';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  public currentUser: IUser;
  token = this.getToken();

  httpOptions = {
     headers: new Headers({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + JSON.parse(this.token)
     })
 };

  // private endpointUrl = environment.API_URL;
  private endpointUrl = environment.API_URL_NODEJS + 'users/';
  constructor(private http: Http, private http_cli: HttpClient) { }

  addUser(user) {
    const uri = this.endpointUrl + 'register';
    this.http.post(uri, user).subscribe(
      res => console.log('Creation reussi'));
  }

  login(courriel: string, motpass: string) {
    return new Promise((resolve, reject) => {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });
      const loginInfo = { email: courriel, password: motpass };
     // console.log('JSON.stringify(loginInfo) = ' + this.endpointUrl + 'authenticate   ;' + JSON.stringify(loginInfo));
      this.http
        .post(this.endpointUrl + 'authenticate', JSON.stringify(loginInfo), options )
        .map(res => res.json())
        // This catch is very powerfull, it can catch all errors
        .catch((err: Response) => {
          // The err.statusText is empty if server down (err.type === 3)
          console.log((err.statusText || 'Impossible de contacter le serveur'));
          // Really usefull. The app can't catch this in "(err)" closure
          reject((err.statusText || 'Impossible de contacter le serveur'));
          // This return is required to compile but unuseable in your app
          console.log(JSON.stringify(err));
          return Observable.throw(err);
        })
        .subscribe(data => {
           localStorage.setItem('currentUser', JSON.stringify(data));
           localStorage.setItem('token', JSON.stringify(data.token));
           this.currentUser = data;
           // const time_to_login = Date.now() + 604800000; // one week
           // console.log('Date.now() 1  : ' + Date.now() );
           const time_to_login = Date.now() + 43200000; // en milliseconds correspond à 12 heures
           localStorage.setItem('timer', JSON.stringify(time_to_login));
          resolve(data);
        });
    });
  }

  /* login_timer (email_username: string, password: string) {
    const params = {
      email_username: email_username,
      password: password
    };
    return this.http.post(AppSettings.API_ENDPOINT + '/auth/login', JSON.stringify(params), {headers: this.headers})
      .map((res) => {
        localStorage.setItem('token', res.json().token);
        const time_to_login = Date.now() + 604800000; // one week
        localStorage.setItem('timer', JSON.stringify(time_to_login));
        return res;
      });
  } */

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getGroupe(_id: number) {
    const url = environment.API_URL_NODEJS;
    return this.http.get(url + 'groupe/' + _id, this.httpOptions)
    .map((response: Response) => <IGroupe>response.json())
    .catch(this.handleError);
  }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    // const jwtHelper: JwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !helper.isTokenExpired(token);
  }

  checkAuthenticationStatus() {
    return this.http.get('/api/currentIdentity').map((response: any) => {
      if (response._body) {
        // ce if est juste pour vérifier si la réponse n'est pas vide. '_body' n'est pas une propriété de response, mais son type
        return response.json();
      } else {
        return {};
      }
    }).do(currentUser => {
      if (currentUser.name) {
        this.currentUser = currentUser;
      }
    }).subscribe();
  }


  logout() {
    this.currentUser = undefined;
    localStorage.removeItem('currentUser');
    // console.log(' Dans logout1() JSON.stringify(this.currentUser) = ' + JSON.stringify(this.currentUser))
    // this.router.navigate(['user/login']);
  }

  updateCurrentUser(email: string, admin: boolean) {
    this.currentUser.email = email;
    this.currentUser.admin = admin;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.endpointUrl + 'update';
    return this.http.put(url, JSON.stringify(this.currentUser), options);
  }

  private handleError(error: Response) {
    // console.log(' dans handleError error : ' + error);
    return Observable.throw(error);
  }

}

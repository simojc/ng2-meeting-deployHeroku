import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { tokenNotExpired } from 'angular2-jwt';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser } from '../Models/index';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  public currentUser: IUser;

  // private endpointUrl = environment.API_URL;
  private endpointUrl = environment.API_URL_NODEJS + 'users/';
  constructor(private http: Http, private http_cli: HttpClient) { }

  login_cli(email: string, password: string) {
    return this.http_cli.post<any>(this.endpointUrl + 'authenticate', { email: email, password: password })
      .map(res => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // console.log('Dans le service JSON.stringify(user) :' + JSON.stringify(res.token))
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('token', JSON.stringify(res.token));
          this.currentUser = res.user;
          // console.log('Dans le service currentUser email :' + JSON.stringify(this.currentUser.email))
        }

        return res;
      });
  }

  addUser(user) {
    const uri = this.endpointUrl + 'register';
    this.http.post(uri, user).subscribe(
      res => console.log('Creation reussi'));
  }

  loginUser(courriel: string, motpass: string) {
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
          return Observable.throw(err);
        })
        .subscribe(data => {
           localStorage.setItem('currentUser', JSON.stringify(data));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.currentUser = data;
          // console.log('currentUser : ' + JSON.stringify(this.currentUser));
         //  console.log('token :' + JSON.parse(localStorage.getItem('token')));
          resolve(data);
        });
    });
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

/*   isAuthenticated() {
    return !!this.currentUser;
    ///  returne True si current User est rensigné (c-d-d si la propriété n'est pas vide)
  } */

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

  updateCurrentUser(email: string, admin: boolean) {
    this.currentUser.email = email;
    this.currentUser.admin = admin;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.endpointUrl + 'update';
    return this.http.put(url, JSON.stringify(this.currentUser), options);
  }

}

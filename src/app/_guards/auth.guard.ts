import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../user/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     // console.log("this.auth.isAuthenticated() =  "+this.auth.isAuthenticated());
    // console.log("localStorage.getItem('currentUser') =  "+localStorage.getItem('currentUser'));
      // if (localStorage.getItem('currentUser') && this.auth.isAuthenticated() ) {
    if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

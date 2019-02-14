import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <nav-bar> </nav-bar>
  <alert></alert>
	<router-outlet> </router-outlet>
  <footer> </footer>
  `
})
export class AppComponent  implements OnInit {
  title = 'app';

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    const timer = JSON.parse(localStorage.getItem('timer'));
    if (timer && (Date.now() > timer)) {
      console.log('timer = :' + timer);
      console.log('Date.now() = :' + Date.now());
      this.auth.logout();
      this.router.navigate(['user/login']);
    }
  }
}

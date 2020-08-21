import {Injectable} from '@angular/core';
import {CanActivateChild, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {
  isAuthUser: boolean = localStorage.getItem('token') != null;

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.isAuthSubj.subscribe((data) => {
      this.isAuthUser = data;
    });
  }

  canActivateChild() {
    if (!this.isAuthUser) {
      this.router.navigate(['/login']);
    }
    return this.isAuthUser;
  }
}

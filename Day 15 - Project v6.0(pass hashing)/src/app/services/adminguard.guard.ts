import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
//guard component that responsible for authentication of ADMIN user 
export class AdminguardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { };
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    console.log('CanActivate called');
    let isLoggedIn = this.authService.isAuthenticated();
    let isAdmin = this.authService.isCurrentSessionAdmin();
    if (isLoggedIn && isAdmin) {
      return true
    } else {
      console.log('nope')
      this.router.navigate(['/login']);
    }
    return false;
  }
}

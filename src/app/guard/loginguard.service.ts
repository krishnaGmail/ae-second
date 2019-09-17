import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServive } from '../services/auth-servive.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loginguard implements CanActivate {

  constructor( private _router: Router , private _authService:AuthServive) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      
      this._router.navigate(['/dashboard']);
      return false;
    }

    // navigate to login page
    
    localStorage.clear();
    // you can save redirect url so after authing we can move them back to the page they requested
    return true;
  }
}

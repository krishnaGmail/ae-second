import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServive {

  constructor() { }
  isAuthenticated():boolean{
    if(localStorage.getItem('userData') != null)
    {
      return true;
    }
    return false;
  }
}

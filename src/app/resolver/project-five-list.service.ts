import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {DashboardService} from '../services/dashboard.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectFiveListService implements Resolve<any> {
  constructor(private _dash: DashboardService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this._dash.getRecentFiveProjectList();
  
  }
}
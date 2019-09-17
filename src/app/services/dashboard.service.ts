import { Injectable } from '@angular/core';
import {userData} from '../model/dashboard';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public dashModel:userData;

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<userData> {
       return this.http.get<userData>("/api/dashboard");
  } 
  setData()
  {
    this.dashModel.fname="Krishna";
    this.dashModel.lname="HUkkeri";
    this.dashModel.flag=0;
    this.dashModel.description="Gmail";
  }
  getData():string{
    return "krishna";
  }
  getRecentFiveProjectList(): Observable<any> {
    return this.http.get<any>("/api/project/getRecentFiveProjectList");
  }
}
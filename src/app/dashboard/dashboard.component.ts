import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {userData} from '../model/dashboard'
import { ActivatedRoute } from '@angular/router';
import { AddProjectModalComponent}  from '../project/add-project-modal/add-project-modal.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{
  title="Dashboard | VSURVE";
  userData:{};
  projectList :any;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {this.projectList=data.recentFiveProjectList});
   }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userData'));
    console.log("DC"+this.userData);
    
  }
  parentLoaded:boolean=false;
  getParentLoaded(childLoaded) {
   
      this.parentLoaded = childLoaded;
    }
}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {userData} from '../model/dashboard'
import { ActivatedRoute } from '@angular/router';
import { AddProjectModalComponent}  from '../project/add-project-modal/add-project-modal.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , AfterViewInit 
{
  @ViewChild('compModal', { static: false, }) compModal: ElementRef;

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
  ngAfterViewInit() {
    if(this.compModal)
    {
      this.compModal.nativeElement.click();
    }
    
  }
  
  parentLoaded:boolean=false;
  getParentLoaded(childLoaded) {
   
      this.parentLoaded = childLoaded;
  }
  setParentPrjLoaded()
  {
    
    this.parentLoaded=true;
   
  }
}

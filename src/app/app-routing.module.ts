import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProjectComponent} from './project/project.component'
import {DashboardGuard} from './guard/dashboard-guard.service';
import { ProjectFiveListService } from './resolver/project-five-list.service';
import { IndexComponent } from './index/index.component';
import { Loginguard } from './guard/loginguard.service';


const routes: Routes = [
 
  { path:"login" ,component:LoginComponent,canActivate: [Loginguard] },
  { path:"signup" ,component:SignupComponent,canActivate: [Loginguard]},
  { path:"dashboard" ,component:DashboardComponent ,canActivate: [DashboardGuard], resolve: {
    recentFiveProjectList: ProjectFiveListService
  }},
  { path:"project" ,component:ProjectComponent ,canActivate: [DashboardGuard]},
  { path:"" ,component:IndexComponent},
  { path: '**', redirectTo:"/" ,pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

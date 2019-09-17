import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftComponent } from './menu/left/left.component';
import { HeaderComponent } from './menu/header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AddProjectModalComponent } from './project/add-project-modal/add-project-modal.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProjectComponent,
    AddProjectModalComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

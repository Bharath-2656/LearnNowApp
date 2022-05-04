import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './user-routes/login/login.component';
import { RegisterComponent } from './user-routes/register/register.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../shared/services/User/user.service';
import { UserprofileComponent } from './admin-routes/userprofile/userprofile.component';
import { AreaofinterestComponent } from './user-routes/areaofinterest/areaofinterest.component';
import { BrowserModule } from '@angular/platform-browser';
import { InstructorComponent } from './instructor/instructor.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent,
    AreaofinterestComponent,
    InstructorComponent,
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    BrowserModule,
    FormsModule,
  
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    AreaofinterestComponent,
  ],
  providers: [UserService],
})
export class CoreModule { }

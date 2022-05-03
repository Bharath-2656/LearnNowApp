import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './user-routes/login/login.component';
import { RegisterComponent } from './user-routes/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../shared/User/user.service';
import { UserprofileComponent } from './admin-routes/userprofile/userprofile.component';
import { AreaofinterestComponent } from './user-routes/areaofinterest/areaofinterest.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent,
    AreaofinterestComponent,
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
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

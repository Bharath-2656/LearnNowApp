import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './user-routes/login/login.component';
import { RegisterComponent } from './user-routes/register/register.component';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../shared/services/User/user.service';
import { UserprofileComponent } from './admin-routes/userprofile/userprofile.component';
import { AreaofinterestComponent } from './user-routes/areaofinterest/areaofinterest.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './user-routes/footer/footer.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent,
    AreaofinterestComponent,
    HomepageComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    AreaofinterestComponent,
    FooterComponent
  ],
  providers: [UserService],
})
export class CoreModule { }

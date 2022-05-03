import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule,HttpInterceptor} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/user-routes/login/login.component';
import { UserService } from './shared/User/user.service';
import { AuthGuard } from './shared/Auth/auth.guard';
import { AuthInterceptor } from './shared/Auth/auth.interceptor';
import { UserRoutesModule } from './core/user-routes/user-routes.module';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    UserRoutesModule,
  ],
  providers: [UserService,AuthGuard,AuthInterceptor ],
  bootstrap: [AppComponent]
})
export class AppModule { }

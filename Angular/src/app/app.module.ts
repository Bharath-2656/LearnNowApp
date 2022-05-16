import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule,HttpInterceptor} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserService } from './shared/services/User/user.service';
import { AuthGuard } from './shared/Auth/auth.guard';
import { AuthInterceptor } from './shared/Auth/auth.interceptor';
import { UserRoutesModule } from './core/user-routes/user-routes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { FooterComponent } from './core/user-routes/footer/footer.component';
import { CommonModule } from '@angular/common';
import { InstructorLoginComponent } from './core/instructor/instructor-login/instructor-login.component';
import { InstructorModule } from './core/instructor/instructor.module';
import { CourseService } from './shared/services/Course/course.service';
import { InstructorService } from './shared/services/Instructor/instructor.service';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';





@NgModule({
  declarations: [
    AppComponent,

    InstructorLoginComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    InstructorModule,
    UserRoutesModule,
    CoreModule,
    HttpClientModule, 
    FormsModule,
    UserRoutesModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
      preventDuplicates:true,
      positionClass:'toast-bottom-left',
    }),
  ],
 exports: [
 ],
 
  providers: [UserService,AuthGuard,AuthInterceptor,CourseService,InstructorService,CookieService,
  {
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "901178890016-v8jukc08edhcbsvaiv864ma59btorcvr.apps.googleusercontent.com"
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

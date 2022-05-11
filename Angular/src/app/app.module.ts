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



@NgModule({
  declarations: [
    AppComponent,
    
    InstructorLoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule, 
    FormsModule,
    UserRoutesModule,
    BrowserAnimationsModule,
    InstructorModule,

    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
      preventDuplicates:true,
      positionClass:'toast-bottom-left',
    }),
  ],
  providers: [UserService,AuthGuard,AuthInterceptor,CourseService,InstructorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

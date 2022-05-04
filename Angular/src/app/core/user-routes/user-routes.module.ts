import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutesRoutingModule } from './user-routes-routing.module';
import { CoursesViewComponent } from './courses-view/courses-view.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { FormsModule } from '@angular/forms';
import { ConfirmenrollmentComponent } from './confirmenrollment/confirmenrollment.component';



@NgModule({
  declarations: [
    CoursesViewComponent,
    CoursepageComponent,
    ConfirmenrollmentComponent,
  ],
  imports: [
    CommonModule,
    UserRoutesRoutingModule,
    FormsModule,
  ],
})
export class UserRoutesModule { }

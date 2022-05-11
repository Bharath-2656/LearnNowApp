import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { FormsModule } from '@angular/forms';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { InsructorcoursesviewComponent } from './insructorcoursesview/insructorcoursesview.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { InstructorNavbarComponent } from './instructor-navbar/instructor-navbar.component';


@NgModule({
  declarations: [
    InstructorProfileComponent,
    InstructorRegisterComponent,
    AddCourseComponent,
    InsructorcoursesviewComponent,
    UpdateCourseComponent,
    InstructorNavbarComponent,

  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
  ]
})
export class InstructorModule { }

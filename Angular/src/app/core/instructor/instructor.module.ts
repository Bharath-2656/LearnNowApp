import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { FormsModule } from '@angular/forms';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { Addcoursestep2Component } from './addcoursestep2/addcoursestep2.component';


@NgModule({
  declarations: [
    InstructorProfileComponent,
    InstructorRegisterComponent,
    AddCourseComponent,
    Addcoursestep2Component
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
  ]
})
export class InstructorModule { }

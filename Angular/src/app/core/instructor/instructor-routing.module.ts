import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Auth/auth.guard';
import { InstructorgaurdGuard } from 'src/app/shared/Auth/instructorgaurd.guard';
import { CoursepageComponent } from '../user-routes/coursepage/coursepage.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { InsructorcoursesviewComponent } from './insructorcoursesview/insructorcoursesview.component';

import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

const routes: Routes = [
  {path: "login", component:InstructorLoginComponent},
  {path: "register", component:InstructorRegisterComponent},
  {path: "addcourse", component: AddCourseComponent,canActivate:[InstructorgaurdGuard],data: {role: 'instructor'}},
  {path: "instructorCourse", component: InsructorcoursesviewComponent , canActivate: [InstructorgaurdGuard], data: {role: 'instructor'}},
  {path: "updateCourse/:id", component: UpdateCourseComponent , canActivate: [InstructorgaurdGuard], data: {role: 'instructor'}},
  {path: "course/:id", component: CoursepageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }

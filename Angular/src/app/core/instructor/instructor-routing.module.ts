import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Auth/auth.guard';
import { InstructorgaurdGuard } from 'src/app/shared/Auth/instructorgaurd.guard';
import { AddCourseComponent } from './add-course/add-course.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';

const routes: Routes = [
  {path: "login", component:InstructorLoginComponent},
  {path: "register", component:InstructorRegisterComponent},
  {path: "addcourse", component: AddCourseComponent,canActivate:[InstructorgaurdGuard],data: {role: 'instructor'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }

import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/Auth/auth.guard';
import { InstructorComponent } from '../instructor/instructor.component';
import { AreaofinterestComponent } from './areaofinterest/areaofinterest.component';
import { ConfirmenrollmentComponent } from './confirmenrollment/confirmenrollment.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { CoursesViewComponent } from './courses-view/courses-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "areaofinterest", component: AreaofinterestComponent,canActivate:[AuthGuard]},
  {path: "category/:id", component: CoursesViewComponent},
  {path: "course/:id", component: CoursepageComponent},
  {path: "instructor/:id", component: InstructorComponent},
  {path: "user/confirmenrollment", component: ConfirmenrollmentComponent}
  
  // {path: "areaofinterest", component: AreaofinterestComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class UserRoutesRoutingModule {
  userDetails: any[] = [];
  constructor() { }
  
 }


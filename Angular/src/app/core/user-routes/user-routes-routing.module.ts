import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/Auth/auth.guard';
import { InstructorProfileComponent } from '../instructor/instructor-profile/instructor-profile.component';

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
  {path: "category/:id", component: CoursesViewComponent,canActivate:[AuthGuard]},
  {path: "course/:id", component: CoursepageComponent,canActivate:[AuthGuard]},
  {path: "instructor/:id", component:InstructorProfileComponent,canActivate:[AuthGuard]},
  {path: "user/confirmenrollment", component: ConfirmenrollmentComponent,canActivate:[AuthGuard]}
  
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


import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/Auth/auth.guard';
import { AreaofinterestComponent } from './areaofinterest/areaofinterest.component';
import { CoursesViewComponent } from './courses-view/courses-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "areaofinterest", component: AreaofinterestComponent},
  {path: "course/:id", component: CoursesViewComponent}
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


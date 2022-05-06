import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './core/instructor/instructor-login/instructor-login.component';



const routes: Routes = [ 
  {path:'user', loadChildren:()=> import('./core/user-routes/user-routes.module').then(m=>m.UserRoutesModule)},
  {path: 'admin', loadChildren:() => import('./core/admin-routes/admin-routes.module').then(m=>m.AdminRoutesModule)},
  {path:'instructors', loadChildren:() => import('./core/instructor/instructor.module').then(m=>m.InstructorModule)},
  // {path: 'instructors',component:InstructorLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

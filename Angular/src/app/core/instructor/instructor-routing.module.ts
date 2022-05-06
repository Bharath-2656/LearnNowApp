import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';

const routes: Routes = [
  {path: "login", component:InstructorLoginComponent},
  {path: "register", component:InstructorRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/Auth/auth.guard';
import { LoginComponent } from './user-routes/login/login.component';
import { RegisterComponent } from './user-routes/register/register.component';
import { UserprofileComponent } from './admin-routes/userprofile/userprofile.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

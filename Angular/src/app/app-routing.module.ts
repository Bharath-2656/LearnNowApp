import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [ 
  {path:'user', loadChildren:()=> import('./core/user-routes/user-routes.module').then(m=>m.UserRoutesModule)},
  {path: 'admin', loadChildren:() => import('./core/admin-routes/admin-routes.module').then(m=>m.AdminRoutesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutesRoutingModule } from './user-routes-routing.module';
import { CoursesViewComponent } from './courses-view/courses-view.component';



@NgModule({
  declarations: [
    CoursesViewComponent,
  ],
  imports: [
    CommonModule,
    UserRoutesRoutingModule
  ],
})
export class UserRoutesModule { }

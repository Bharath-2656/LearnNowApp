import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//  
import { UserRoutesRoutingModule } from './user-routes-routing.module';
import { CoursesViewComponent } from './courses-view/courses-view.component';
import { CoursepageComponent } from './coursepage/coursepage.component';



@NgModule({
  declarations: [
    CoursesViewComponent,
    CoursepageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutesRoutingModule,
    //NgbRatingModule,
  ],
})
export class UserRoutesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutesRoutingModule } from './user-routes-routing.module';
import { CoursesViewComponent } from './courses-view/courses-view.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { FormsModule } from '@angular/forms';
import { ConfirmenrollmentComponent } from './confirmenrollment/confirmenrollment.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CoursesViewComponent,
    CoursepageComponent,
    ConfirmenrollmentComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    CommonModule,
    UserRoutesRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class UserRoutesModule { }

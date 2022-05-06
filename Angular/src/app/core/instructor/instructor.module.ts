import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { FormsModule } from '@angular/forms';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';


@NgModule({
  declarations: [
    InstructorProfileComponent,
    InstructorRegisterComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
  ]
})
export class InstructorModule { }

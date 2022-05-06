import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';


@NgModule({
  declarations: [
    InstructorProfileComponent,
    InstructorLoginComponent,
    InstructorRegisterComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
    BrowserModule,
  ]
})
export class InstructorModule { }

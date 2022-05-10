import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent implements OnInit {

  constructor(private instructorService: InstructorService, private router : Router) { }
  serverErrorMessages!: string;

  ngOnInit(): void {
  }
  
    onSubmit(formOne : NgForm){
      this.instructorService.login(formOne.value).subscribe((res : any)=>{
        console.log("cool");
        
        //localStorage.setItem('userToken',data.access_token);
        this.instructorService.setToken(res['token']);
        this.instructorService.postintructorid(this.instructorService.getInstructorfromPayload());
        this.router.navigate(['/instructors/instructorCourse']);
      
        
      },
      (err : HttpErrorResponse)=>{
        this.serverErrorMessages = err.error.message;
      }); 
    }

}

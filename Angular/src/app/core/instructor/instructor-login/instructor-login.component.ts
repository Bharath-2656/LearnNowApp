import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent implements OnInit {

  constructor(private instructorService: InstructorService, private cookieService: CookieService, private router : Router, private toastr: ToastrService) { }
  serverErrorMessages!: string;

  ngOnInit(): void {
  }
  
    onSubmit(formOne : NgForm){
      this.instructorService.login(formOne.value).subscribe((res : any)=>{
       
        this.toastr.success('Login Successfully','Success');
        this.instructorService.setToken(res['token']);
        this.instructorService.setRefreshToken(res['refreshtoken']);
        this.cookieService.set('instructorid',this.instructorService.getInstructorfromPayload());
        this.instructorService.postintructorid(this.instructorService.getInstructorfromPayload());
        setTimeout(() =>{
          this.router.navigate(['/instructors/instructorCourse']);
        }, 2500); 
        
      
        
      },
      (err : HttpErrorResponse)=>{
        this.toastr.error(err.error.message, 'Error')
      }); 
    }

}

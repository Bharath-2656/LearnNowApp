import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent implements OnInit {

  constructor(private userService: UserService, private router : Router) { }
  serverErrorMessages!: string;

  ngOnInit(): void {
  }
  
    onSubmit(formOne : NgForm){
      this.userService.login(formOne.value).subscribe((res : any)=>{
        //localStorage.setItem('userToken',data.access_token);
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
        this.router.navigate(['/user/areaofinterest']);
      },
      (err : HttpErrorResponse)=>{
        this.serverErrorMessages = err.error.message;
      }); 
    }

}

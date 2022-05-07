import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/User/user.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router : Router) { }
  serverErrorMessages!: string;

  ngOnInit(): void {
  }
  
    onSubmit(formOne : NgForm){
      this.userService.login(formOne.value).subscribe((res : any)=>{
        //localStorage.setItem('userToken',data.access_token);
        this.userService.setToken(res['token']);
        this.userService.getuserfromPayload();
        this.router.navigateByUrl('/userprofile');
        this.router.navigate(['/user/areaofinterest']);
      },
      (err : HttpErrorResponse)=>{
        this.serverErrorMessages = err.error.message;
      }); 
    }
    //this.login.getUserDetails(username,password);
}

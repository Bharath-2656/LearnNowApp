import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/User/user.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router : Router, private toastr: ToastrService) { }
  serverErrorMessages!: string;

  ngOnInit(): void {
  }
  
    onSubmit(formOne : NgForm){
      this.userService.login(formOne.value).subscribe((res : any)=>{

        this.toastr.success('Login Successfully','Success');
       
        this.userService.setToken(res['token']);
        this.userService.getuserfromPayload();
        setTimeout(() =>{
          this.router.navigate(['/user/dashboard']);
        }, 3000); 
        
      },
      (err : HttpErrorResponse)=>{
        this.serverErrorMessages = err.error.message;
      }); 
    }
    //this.login.getUserDetails(username,password);
}

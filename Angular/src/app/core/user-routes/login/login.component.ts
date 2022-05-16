import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/User/user.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
     private cookieService:CookieService,
     private router : Router,
     private toastr: ToastrService,
     private authService: SocialAuthService,
      ) { }
  serverErrorMessages!: string;

  ngOnInit(): void {
  }
    googlelogin()
    {
      console.log("google");
      
      this.userService.googlelogin().subscribe((res) =>{
      

      });
    }
    // signInWithGoogle(): any {
    //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    // }

    
    onSubmit(formOne : NgForm){
      this.userService.login(formOne.value).subscribe((res : any)=>{

        this.toastr.success('Login Successfully','Success');
       
        this.userService.setToken(res['token']);
        this.cookieService.set('userid',this.userService.getuserfromPayload())
        this.userService.getuserfromPayload();
        setTimeout(() =>{
          this.router.navigate(['/user/dashboard']);
        }, 3000); 
        
      },
      (err : HttpErrorResponse)=>{
        this.toastr.error(err.error.message, 'Error')
        
      }); 
    }
    //this.login.getUserDetails(username,password);
}

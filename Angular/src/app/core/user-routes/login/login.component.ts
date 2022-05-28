import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/User/user.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { globalVars } from 'src/app/shared/services/Url/url.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  constructor(private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,
    private authService: SocialAuthService,
  ) { }
  serverErrorMessages!: string;
  auth2: any;
  userid: any;
  show = false;
  url: string = `${globalVars.backendAPI}/admin/`;
  ngOnInit(): void
  {}

  googlelogin()
  {

    window.open(this.url + 'api/auth/google',
      //"_self",
      "_window",
      "location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) =>
    {
      this.userid = message.data.userid;
    });

    setTimeout(() =>
    {
      this.userService.getgoogleauthtoken(this.userid).subscribe((res: any) =>
      {
        this.userService.setToken(res['token'])
        this.userService.setRefreshToken(res['refreshtoken']);
        this.cookieService.set('userid', this.userService.getuserfromPayload())

        setTimeout(() =>
        {
          this.router.navigate(['/user/dashboard']);
        }, 2000);
      })

    }, 4000);
  }


  onSubmit(formOne: NgForm)
  {
    this.userService.login(formOne.value).subscribe((res: any) =>
    {

      this.toastr.success('Login Successfully', 'Success');
      localStorage.removeItem('otp');
      this.userService.setToken(res['token']);
      this.userService.setRefreshToken(res['refreshtoken']);
      this.cookieService.set('userid', this.userService.getuserfromPayload())
      this.userService.getuserfromPayload();
      setTimeout(() =>
      {
        this.router.navigate(['/user/dashboard']);
      }, 3000);

    },
      (err: HttpErrorResponse) =>
      {
        this.toastr.error(err.error.message, 'Error')

      });
  }
  //this.login.getUserDetails(username,password);
  
}

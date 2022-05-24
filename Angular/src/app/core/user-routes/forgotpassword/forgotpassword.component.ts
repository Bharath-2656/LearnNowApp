import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private  userService:UserService, private router: Router, private toastr: ToastrService) { }
  otp!: Number;
  ngOnInit(): void {
    
  }
  submitemail()
  {
    var email = (<HTMLInputElement>document.getElementById('email'))!.value;
    this.userService.forgotpasswordmail(email).subscribe((res:any)=> {

      document.getElementById("otpform")!.style.display = "block";
      localStorage.setItem('otp', res.data);
      
    });
  }
  submitotp()
  {
    this.otp =Number((<HTMLInputElement>document.getElementById('otp'))!.value);
 
   const otpfrommail =Number(localStorage.getItem('otp'));
  if(otpfrommail==this.otp){
    document.getElementById("passwords")!.style.display = "block";
  }
  else{
    this.toastr.error("Invalid OTP Please try again", 'Error')
  }
  }

  submitpassword(){
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    var email = (<HTMLInputElement>document.getElementById('email'))!.value;

    this.userService.postnewpassword(email, password).subscribe((res:any) => {
      this.toastr.success('Password Changed Successfully','Success');
      setTimeout(() => {
        this.router.navigate(['/user/login'])
      }, 3000); 
        
    })
    
  }
  resendotp()
  {
    this.submitemail();
  }
}

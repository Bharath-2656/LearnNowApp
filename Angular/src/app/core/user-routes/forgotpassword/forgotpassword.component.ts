import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private  userService:UserService) { }
  otp!: Number;
  ngOnInit(): void {
  }
  submit()
  {
   this.otp = Number((<HTMLInputElement>document.getElementById('otp')).value);
   console.log(this.otp);
   localStorage.getItem('otp');
  //  this.userService.verifyotp(this.otp).subscribe((res:any) => {

  //  })
  }
}

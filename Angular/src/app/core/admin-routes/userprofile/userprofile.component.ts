import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/User/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userDetails: any[] = [];
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.userService.getUserProfile().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.userDetails[index]=res[index]; 
      }
    },
    (err:any) => {
      console.log(err);
      });
  };

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['user/login']);
  }
}

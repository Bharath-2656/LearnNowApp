import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  id!: Number;
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    //this.id = this.userService.getuserfromPayload();
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['user/login']);
  }
}

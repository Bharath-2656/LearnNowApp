import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  id!: Number;
  constructor(private userService : UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    
  }
  onLogout(){
    this.userService.deleteToken().subscribe((res:any) => { 
    });
    this.cookieService.delete('refreshtoken');  
    this.cookieService.deleteAll('/');
    this.router.navigate(['user/login']);
  }
}

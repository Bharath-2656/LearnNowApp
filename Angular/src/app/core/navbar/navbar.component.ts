import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {

    
  } 
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['user/login']);
  }

}


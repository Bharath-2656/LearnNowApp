import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrls: ['./instructor-navbar.component.css']
})
export class InstructorNavbarComponent implements OnInit {
  id!: Number;
  constructor(private instructorService : InstructorService, private cookieService :CookieService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.instructorService.deleteToken().subscribe((res:any) => {

    });
    this.cookieService.deleteAll();
    this.router.navigate(['instructors/login']);
  }

}

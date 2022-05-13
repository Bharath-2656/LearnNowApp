import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrls: ['./instructor-navbar.component.css']
})
export class InstructorNavbarComponent implements OnInit {
  id!: Number;
  constructor(private instructorService : InstructorService, private router: Router) { }

  ngOnInit(): void {
    //this.id=this.instructorService.getInstructorfromPayload();
  }
  onLogout(){
    this.instructorService.deleteToken();
    this.router.navigate(['instructors/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  users: any[] = [];
  usercourses: any[] =[];
  temp: any[] = [];
  temp2: any[] =[];
  id: any;
  courseservices: any[] =[];
  constructor(private userService:UserService, private courseService:CourseService ) { }

  ngOnInit(): void {

   this.userService.getUsercourse().subscribe((res : any)=>{
    this.usercourses = res;
    this.id=this.userService.getuserfromPayload();
    
  });
}

}

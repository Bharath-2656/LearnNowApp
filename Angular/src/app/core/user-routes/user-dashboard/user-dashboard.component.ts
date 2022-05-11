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
  uc: any[] =[];
  usercourses: any[] =[];
  id: any;
  courses: any[] =[];
  courseservices: any[] = [];
  constructor(private userService:UserService, private courseService:CourseService ) { }
  
  ngOnInit(): void {
   
   this.userService.getUsercourse().subscribe((res : any)=>{
    this.usercourses = res;
    
    
    this.id=this.userService.getuserfromPayload();
    
  });

  this.courseService.getCourse().subscribe((res:any) => {
    this.courses = res;
  })


  this.userService.getUserProfile().subscribe((res:any) => {
    this.users = res;  
   for (let index = 0; index < res.length; index++) {
     this.uc = this.users[index].courseid;
     //console.log(this.uc);
     
   }
   
  })

  this.courseService.getAreaOfInterestCourse().subscribe((res:any) => {
    for (let index = 0; index < res.length; index++) {
     this.courseservices[index]=res[index];
     
    }
  },
  (err:any) => {
    console.log(err);
    });

  }
}


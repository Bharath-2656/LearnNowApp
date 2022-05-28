import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { Instructor } from 'src/app/shared/services/Instructor/instructor.model';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';
import { UserService } from 'src/app/shared/services/User/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insructorcoursesview',
  templateUrl: './insructorcoursesview.component.html',
  styleUrls: ['./insructorcoursesview.component.css']
})
export class InsructorcoursesviewComponent implements OnInit {
  instructorCourses: any[] = [];
  instructorid : any;
  instructors: any[] = [];
  courses: any[] = [];
  usercourses: any[] =[];
  instructorcourses: any[] = [];
  author!: String;
  constructor(private instructorService: InstructorService, private cookieService: CookieService, private courseService: CourseService, public router: Router,private userService:UserService) { }

  ngOnInit(): void {

    this.instructorid= this.instructorService.getInstructorfromPayload();

    this.instructorService.getInstructorCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
        this.instructors[index]=res[index];
        if(res[index].instructorid==this.instructorid)
        {
        this.instructorCourses[index]=res[index].instructor_courses;
        this.author= res[index].routerlink;
        }       
       }

    });
    
    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.courses[index]=res[index];
       
      }
    });
    
     this.userService.getUsercourse().subscribe((res : any)=>{
      this.usercourses = res;
    })
     
  }
  delete(name: any, id: any)
  {

    Swal.fire({
      title: "Are you sure you want to delete this course "+ name,
      // text: "Write something interesting:",
      // input: 'text',
      showCancelButton: true        
  }).then((result) => {
    if (result.value) {
        this.courseService.deleteCourse(id).subscribe((res:any) => {});
        console.log("Result: " + result.value);
          window.location.reload();
      }
  });
  }
  onLogout(){
    this.instructorService.deleteToken().subscribe((res:any) => {

    });
    this.cookieService.delete('refreshtoken');  
    this.cookieService.deleteAll('/');
    this.router.navigate(['instructors/login']);
  }
  
}

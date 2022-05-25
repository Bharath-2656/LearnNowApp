import { RESTORED_VIEW_CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { UserService } from 'src/app/shared/services/User/user.service';
import Swal from 'sweetalert2';
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
  name!: String;
  mycourse: any[] =[];
  ucourse: any[] = [];
  constructor(private userService:UserService, private courseService:CourseService, private router: Router, private cookieService: CookieService ) { }
  
  ngOnInit(): void {
   
   this.userService.getUsercourse().subscribe((res : any)=>{
    for (let index = 0; index < res.length; index++) {
      this.usercourses[index] = res[index];
    }   
    this.id=this.userService.getuserfromPayload();
  });

  this.courseService.getCourse().subscribe((res:any) => {
    this.courses = res;
  })


  this.userService.getUserProfile().subscribe((res:any) => {
    this.users = res;  
    this.id=this.userService.getuserfromPayload();
   for (let index = 0; index < res.length; index++) {
     this.uc = this.users[index].courseid;   
     
     
     if(this.id==this.users[index].userid)
     {
      this.name = this.users[index].name;
     }
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

    this.userService.getUsercourseonuser().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
        this.id=this.userService.getuserfromPayload();
        if(this.id==res[index].userid)
        {
          
            if(res[index].user_courses.length==0)
            {
              
              
              (document.getElementById("top"))!.innerHTML = "No courses Enrolled";
              document.getElementById('nocourse')!.style.display = "block"

            }
        }
      }
    })

}
review(routerlink: String)
{
  Swal.fire({
    title: "Please give your honest feedback ",
    // text: "Write something interesting:",
     input: 'textarea',
     //html: '<input id="one" >' + '<input type="textarea" id="two">',
    
    showCancelButton: true        
}).then((result) => {

      this.courseService.courseReview(routerlink, result.value, this.name).subscribe((res:any) => {
        
       })
    }
);
  
}
onLogout(){
  this.userService.deleteToken().subscribe((res:any) => { 
  });
  this.cookieService.delete('refreshtoken');  
  this.cookieService.deleteAll('/');
  this.router.navigate(['user/login']);
}

}



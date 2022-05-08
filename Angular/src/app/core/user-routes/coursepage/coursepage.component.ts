import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css']
})
export class CoursepageComponent implements OnInit {

  public id!: any;
  public userid!: any;
  courseid!: any;
  courses: any[] = [];
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  courseincludes!: string;
  coursecontents!: string;
  courserequirements!: string;
  constructor(private courseService: CourseService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.id=this.route.snapshot.paramMap.get('id');
    
    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.courses[index]=res[index];
       if(this.id==this.courses[index].routerlink)
       {
         this.courseincludes=this.courses[index].courseincludes.split(',');
         this.coursecontents=this.courses[index].contents.split(',');
        this.courserequirements=this.courses[index].requirements.split(',')      
         
       }
       console.log(this.courseincludes);
       
      }
    },
    (err:any) => {
      console.log(err);
      });

  };
  onSubmit(formOne : NgForm){
    formOne.value.courseid=this.id;
    formOne.value.userid = this.userService.getUserPayload().userid;
    this.courseService.sendConfirmationMail(this.courses).subscribe((res) => {
        
    });
    this.userService.postUserCourse(formOne.value).subscribe((res) => {
      this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 4000);
    this.router.navigate(['user/confirmenrollment']);
  },
  err => {
    if (err.status === 422) {
      this.serverErrorMessages = err.error.join('<br/>');
    }
    else
      this.serverErrorMessages = 'Something went wrong. Please contact admin.';
  }
);
  }

}

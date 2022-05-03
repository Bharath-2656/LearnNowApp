import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/Course/course.service';
import { UserService } from 'src/app/shared/User/user.service';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css']
})
export class CoursepageComponent implements OnInit {

  public id!: any;
  public userid!: any;
  courses: any[] = [];
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  constructor(private courseService: CourseService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.id=this.route.snapshot.paramMap.get('id');
    
    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.courses[index]=res[index];
       
      }
    },
    (err:any) => {
      console.log(err);
      });

  };
  onSubmit(formOne : NgForm){
    this.userid = this.userService.getUserPayload().userid;
    this.userService.postUserCourse(this.id,this.userid).subscribe((res) => {
      this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 4000);
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

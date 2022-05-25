import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  constructor(public courseService: CourseService, private cookieService:CookieService, private toastr: ToastrService, private router: Router, private instructorService: InstructorService, private route: ActivatedRoute) { }
  courses: any[] = [];
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  public id!: any;
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.resetForm(); 

    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
        this.courses=res;
      }
      
      
    },
    err => {
      if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages = 'Something went wrong. Please contact admin.';
    });

  }
    resetForm(form?: NgForm) {
      if (form)
        form.reset();
        
      this.courseService.selectedCourses = {
        name: "",
        price: 0,
        description: "",
        duration: "",
        category: "",
        author: "",
        language: "",
        contents: "",
        courseid: 0,
        requirements: "",
        courseincludes: "",
        
      };
      this.serverErrorMessages = '';
    }
    
    onSubmit(form: NgForm) {
      console.log(form.value);
      
      this.courseService.putCourse(form.value).subscribe((res) => {
       
      
      this.resetForm(form);
    },
    err => {
      if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages = 'Something went wrong. Please contact admin.';
    }
    );
     this.instructorService.postInstructorCourse(form.value).subscribe((res) => {
      this.toastr.success('Course Updated successfull','Success');
      setTimeout(() => {
        this.router.navigate(['instructors/instructorCourse']);
      }, 3000)
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

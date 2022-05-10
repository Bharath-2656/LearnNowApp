import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  constructor(public courseService: CourseService, private router: Router, private instructorService: InstructorService, private route: ActivatedRoute) { }
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
          this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        // this.router.navigate(['user/confirmenrollment']);
        });
    }
  

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/shared/services/Course/course.model';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  [x: string]: any;
  newContents! : string;
  allCourses : string[] = [];
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  name = 'Dynamic Add Fields';
  values: any[5] = [];
  course: Course = new Course;
  constructor(public courseService: CourseService, private cookieService: CookieService, private toastr: ToastrService, private router: Router, private instructorService: InstructorService) { }
  
  ngOnInit(): void {
    this.resetForm(); 
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
  
//Function to add course
// addCourse(){
//     this.courseService.selectedCourses.contents.push(this.newContents);
// }
onSubmit(form: NgForm) { 
  if(form.value.name == "" || form.value.author == ""  ||  form.value.category == "")
  {
    this.toastr.error('Please add Course details','Error');
  }
  else{
  this.courseService.postCourse(form.value).subscribe((res) => {
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
  this.toastr.success('Course Registered successful','Success');
  setTimeout(() => {
    this.router.navigate(['instructors/instructorCourse']);
  }, 3000)
});

  }
 }
 onLogout(){
  this.instructorService.deleteToken().subscribe((res:any) => {

  });
  this.cookieService.delete('refreshtoken');  
  this.cookieService.deleteAll('/');
  this.router.navigate(['instructors/login']);
}
}
 

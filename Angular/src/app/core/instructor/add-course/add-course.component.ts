import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/shared/services/Course/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  newContents! : string;
  allCourses : string[] = [];
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  constructor(public courseService: CourseService, private router: Router) { }
  
  ngOnInit(): void {
    this.resetForm(); 
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.courseService.selectedCourses = {
      name: "",
      price: 18,
      description: "",
      duration: "",
      category: "",
      author: "",
      language: "",
      contents: [],
      courseid: 0,
    };
    this.serverErrorMessages = '';
  }
  
//Function to add course
addCourse(){
    this.courseService.selectedCourses.contents.push(this.newContents);
}
onSubmit(form: NgForm) {
  this.courseService.postCourse(form.value).subscribe((res) => {
    this.router.navigate(['/addcoursestep2'])
  
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
}

}
 

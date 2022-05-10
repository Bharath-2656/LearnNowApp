import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { Instructor } from 'src/app/shared/services/Instructor/instructor.model';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';
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
 
  constructor(private instructorService: InstructorService, private courseService: CourseService, public router: Router) { }

  ngOnInit(): void {
    this.instructorService.getInstructor().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
        this.instructors[index]=res[index];
        
       }
      
    });
    
    
    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.courses[index]=res[index];
       
      }
    });
    

     this.instructorid= this.instructorService.getInstructorfromPayload();
    
     
  }
  delete(name: any, id: any)
  {
    //console.log(id);
    
    Swal.fire({
      title: "Are you sure you want to delete this course "+ name,
      // text: "Write something interesting:",
      // input: 'text',
      showCancelButton: true        
  }).then((result) => {
    this.courseService.deleteCourse(id).subscribe((res:any) => {});
      if (result.value) {
          console.log("Result: " + result.value);
      }
  });
  }

}

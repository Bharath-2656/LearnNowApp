import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { Instructor } from 'src/app/shared/services/Instructor/instructor.model';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

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
  constructor(private instructorService: InstructorService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.instructorService.getInstructor().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
        this.instructors[index]=res[index];
        //console.log(this.instructor[index]);
        
       }
      
    });
    
    
    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.courses[index]=res[index];
      }
    });
    

     this.instructorid= this.instructorService.getInstructorfromPayload();
     console.log(this.instructorid);
     
  }

}

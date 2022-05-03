import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/Course/course.service';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css']
})
export class CoursepageComponent implements OnInit {

  public id!: any;
  courseservices: any[] = [];
  courses: any[] = [];
  starRating = 0;
  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) { }

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

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {

  public id!: any;
  courseservices: any[] = [];
  course: any[] = [];
  Course: any = '';
  SearchCourse: string= '';
  Parameter: string='';
  SortbyParam: string='';
  SortDirection = 'asc';
  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id=this.route.snapshot.paramMap.get('id');
    
    this.courseService.getAreaOfInterestCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.courseservices[index]=res[index];
       
      }
    },
    (err:any) => {
      console.log(err);
      });

  };
  onCourseFilter() {
    this.SearchCourse = this.Course;
    
  }

  onCourseFilterClear() {
    this.SearchCourse = '';
    this.Course = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}

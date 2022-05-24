import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  userid!: Number;
  userintrest: any[] =[]
  constructor(private courseService: CourseService, private cookieService: CookieService, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    this.id=this.route.snapshot.paramMap.get('id');
    
    this.userid = this.userService.getuserfromPayload();

    // this.userService.postAreaOfIntrestForUser(this.userid, this.id).subscribe((res:any) => {
    //   this.userintrest = res;

    // })
    
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
  onLogout()
  {
    this.userService.deleteToken().subscribe((res: any) =>
    {
    });
    this.cookieService.delete('refreshtoken');  
    this.cookieService.deleteAll('/');
    this.router.navigate(['user/login']);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  [x: string]: any;

  selectedCourses!: Course;
  courses!: Course[];
  readonly baseURL = 'http://localhost:9000/course/';

  constructor(private http: HttpClient) { }

  getAreaOfInterestCourse() {
    return this.http.get(this.baseURL + 'areaofinterestcourse' )
  }
  getCourse(){
    return this.http.get(this.baseURL + 'usercourse')
  }
  postCourse(course: Course) {
    return this.http.post(this.baseURL + 'usercourse', course);
  }

  putCourse(course: Course) {
    return this.http.put(this.baseURL + 'usercourse' + `/${course.courseid}`, course);
  }
  putCoursecontents(course:Course)
  {
    return this.http.put(this.baseURL + 'usercourse/coursecontents' + `/${course.courseid}`, course.contents);
  }
  deleteCourse(courseid: Number) {
    console.log(courseid);
  
    
    return this.http.delete(this.baseURL + 'usercourse' + `/${courseid}`);
  }

  sendConfirmationMail(courses:any)
  {
    return this.http.post('http://localhost:9000/admin/course_mail', courses);
  }
}

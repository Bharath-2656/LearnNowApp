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
    return this.http.put(this.baseURL + 'usercourse' + `/${course.name}`, course);
  }
  putCoursecontents(course:Course)
  {
    return this.http.put(this.baseURL + 'usercourse/coursecontents' + `/${course.courseid}`, course.contents);
  }
  deleteCourse(courseid: Number) { 
    return this.http.delete(this.baseURL + 'usercourse' + `/${courseid}`);
  }
  courseEnrollCount(routerlink: String)
  {   
    return this.http.put(this.baseURL + 'courseenrollcount' + `/${routerlink}`, routerlink)
  }
  courseReview(routerlink: String, reviews: String, name: String)
  {   
    return this.http.put(this.baseURL + 'coursereview' + `/${routerlink}` + `/${reviews}`+ `/${name}`, reviews);
  }
  sendConfirmationMail(courses:any)
  { console.log("Mailed");
  
    return this.http.post('http://localhost:9000/admin/course_mail', courses);
  }
}

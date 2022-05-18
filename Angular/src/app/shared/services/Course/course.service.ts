import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { globalVars } from "../Url/url.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  [x: string]: any;

  selectedCourses!: Course;
  courses!: Course[];
  readonly baseURL = 'http://localhost:9000/course/';
  url: string = `${globalVars.backendAPI}/course/`;
  constructor(private http: HttpClient) { }

  getAreaOfInterestCourse() {
    return this.http.get(this.url + 'areaofinterestcourse' )
  }
  getCourse(){
    return this.http.get(this.url + 'usercourse')
  }
  postCourse(course: Course) {
    return this.http.post(this.url + 'usercourse', course);
  }
 
  putCourse(course: Course) {
    return this.http.put(this.url + 'usercourse' + `/${course.name}`, course);
  }
  putCoursecontents(course:Course)
  {
    return this.http.put(this.url + 'usercourse/coursecontents' + `/${course.courseid}`, course.contents);
  }
  deleteCourse(courseid: Number) { 
    return this.http.delete(this.url + 'usercourse' + `/${courseid}`);
  }
  courseEnrollCount(routerlink: String)
  {   
    return this.http.put(this.url + 'courseenrollcount' + `/${routerlink}`, routerlink)
  }
  courseReview(routerlink: String, reviews: String, name: String)
  {   
    return this.http.put(this.url + 'coursereview' + `/${routerlink}` + `/${reviews}`+ `/${name}`, reviews);
  }
  sendConfirmationMail(courseid: any)
  { console.log("Mailed");
  
    return this.http.post('http://localhost:9000/admin/course_mail', courseid);
  }
}

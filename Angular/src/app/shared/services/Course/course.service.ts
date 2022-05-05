import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly baseURL = 'http://localhost:9000/course/';

  constructor(private http: HttpClient) { }

  getAreaOfInterestCourse() {
    return this.http.get(this.baseURL + 'areaofinterestcourse' )
  }
  getCourse(){
    return this.http.get(this.baseURL + 'usercourse')
  }
  sendConfirmationMail(courses:any)
  {
    return this.http.post('http://localhost:9000/admin/course_mail', courses);
  }
}

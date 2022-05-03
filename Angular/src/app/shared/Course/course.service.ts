import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly baseURL = 'http://localhost:9000/instructor/';

  constructor(private http: HttpClient) { }

  getAreaOfInterestCourse() {
    return this.http.get(this.baseURL + 'areaofinterestcourse' )
  }
  getCourse(){
    return this.http.get(this.baseURL + 'courses')
  }
}

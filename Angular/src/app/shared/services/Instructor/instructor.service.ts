import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from './instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  readonly baseURL = 'http://localhost:9000/instructor/';

  constructor(private http: HttpClient) { }

  getInstructor() {
    return this.http.get(this.baseURL + 'instructors');
  }
  postInstructor(instructor: Instructor) {
    return this.http.post(this.baseURL + 'users', instructor);
  }

  putinstructor(instructor: Instructor) {
    return this.http.put(this.baseURL + 'users' + `/${instructor.instructorid}`, instructor);
  }

  deleteInstructor(instructor: Instructor) {
    return this.http.delete(this.baseURL + 'users' + `/${instructor.instructorid}`);
  }
}

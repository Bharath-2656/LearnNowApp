import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from './instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  selectedInstructors!: Instructor;
  instructors!: Instructor[];
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  readonly baseURL = 'http://localhost:9000/instructor/';

  constructor(private http: HttpClient) { }

  getInstructor() {
    return this.http.get(this.baseURL + 'instructors');
  }
  postInstructor(instructor: Instructor) {
    return this.http.post(this.baseURL + 'instructors', instructor);
  }

  putinstructor(instructor: Instructor) {
    return this.http.put(this.baseURL + 'instructors' + `/${instructor.instructorid}`, instructor);
  }

  deleteInstructor(instructor: Instructor) {
    return this.http.delete(this.baseURL + 'instructors' + `/${instructor.instructorid}`);
  }

  login(authCredentials:any) {
    return this.http.post(this.baseURL + 'authenticate', authCredentials,this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  postRefreshtokencheck(instructor: Instructor)
  {
   return this.http.post(this.baseURL + 'token', instructor);
  }

  getInstructorfromPayload()
 {
   const userid = this.getInstructorPayload().userid;
   return userid;
 }
 getInstructorPayload() {
  var token = this.getToken();
   
  if (token) {
    var instructorPayload = atob(token.split('.')[1]);
    return JSON.parse(instructorPayload);
  }
  else
    return null;
}
isLoggedIn() {
  var instructorPayload = this.getInstructorPayload();
   
  if (instructorPayload)
 {
   console.log(instructorPayload.exp > Date.now() / 1000);
   
    return instructorPayload.exp > Date.now() / 1000;
 }
  else
    return false;
}

}

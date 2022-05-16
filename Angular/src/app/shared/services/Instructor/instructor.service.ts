import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from './instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService
{
  selectedInstructors!: Instructor;
  instructors!: Instructor[];
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  readonly baseURL = 'http://localhost:9000/instructor/';

  constructor(private http: HttpClient) { }

  getInstructor()
  {
    return this.http.get(this.baseURL + 'instructors');
  }
  postInstructor(instructor: Instructor)
  {
    return this.http.post(this.baseURL + 'instructors', instructor);
  }

  putinstructor(instructor: Instructor)
  {
    return this.http.put(this.baseURL + 'instructors' + `/${instructor.instructorid}`, instructor);
  }

  deleteInstructor(instructor: Instructor)
  {
    return this.http.delete(this.baseURL + 'instructors' + `/${instructor.instructorid}`);
  }

  login(authCredentials: any)
  {
    return this.http.post(this.baseURL + 'authenticate', authCredentials, this.noAuthHeader);
  }
  setToken(token: string)
  {
    localStorage.setItem('token', token);
  }
  getToken()
  {
    return localStorage.getItem('token');
  }

  deleteToken()
  { var instructorid;
    setTimeout(() => {
      instructorid = this.getInstructorfromPayload();
    }, 500);
     localStorage.removeItem('token');
    return this.http.post(this.baseURL + 'deletetoken' + `/${instructorid}`,instructorid);
  }

  postRefreshtokencheck(instructorid: Number)
  {
    return this.http.post(this.baseURL + 'token' + `/${instructorid}`,this.noAuthHeader);
  }

  getInstructorfromPayload()
  {
    return this.getInstructorPayload().instructorid;
  }
  postintructorid(instructorid: Number)
  {
    return this.http.post(this.baseURL + 'getinstructorid', instructorid);
  }
  getInstructorPayload()
  {
    var token = this.getToken();

    if (token)
    {
      var instructorPayload = atob(token.split('.')[1]);
      return JSON.parse(instructorPayload);
    }
    else
      return null;
  }
  isLoggedIn()
  {
    var instructorPayload = this.getInstructorPayload();

    if (instructorPayload)
    {
      return instructorPayload.exp > Date.now() / 1000;
    }
    else
      return false;
  }
  postInstructorCourse(instructor: Instructor)
  {
    return this.http.put(this.baseURL + 'instructorcourse' + `/${instructor.instructorid}`, instructor);
  }
  getInstructorCourse()
  {
    return this.http.get(this.baseURL + 'instructorcourse');
  }

}

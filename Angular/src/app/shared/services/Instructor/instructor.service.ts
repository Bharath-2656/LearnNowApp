import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from './instructor.model';
import { globalVars } from "../Url/url.model";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InstructorService
{
  selectedInstructors!: Instructor;
  instructors!: Instructor[];
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  readonly baseURL = 'http://localhost:9000/instructor/';
  url: string = `${globalVars.backendAPI}/instructor/`;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getInstructor()
  {
    return this.http.get(this.url + 'instructors');
  }

  postInstructor(instructor: Instructor)
  {
    return this.http.post(this.url + 'instructors', instructor);
  }

  putinstructor(instructor: Instructor)
  {
    return this.http.put(this.url + 'instructors' + `/${instructor.instructorid}`, instructor);
  }

  deleteInstructor(instructor: Instructor)
  {
    return this.http.delete(this.url + 'instructors' + `/${instructor.instructorid}`);
  }

  login(authCredentials: any)
  {
    return this.http.post(this.url + 'authenticate', authCredentials, this.noAuthHeader);
  }
  setToken(token: string)
  {
    localStorage.setItem('token', token);
  }
  setRefreshToken(refreshtoken: string)
  {
    this.cookieService.set('refreshtoken', refreshtoken);
  }
  getToken()
  {
    return localStorage.getItem('token');
  }

  deleteToken()
  { var instructorid;
    setTimeout(() => {
      instructorid = this.cookieService.get('instructorid');
    }, 500);
     localStorage.removeItem('token');
    return this.http.post(this.url + 'deletetoken' + `/${instructorid}`,instructorid);
  }

  postRefreshtokencheck(instructorid: Number)
  {
    const refreshtoken = this.cookieService.get('refreshtoken');
    return this.http.post(this.url + 'token' + `/${instructorid}` + `/${refreshtoken}`,this.noAuthHeader);
  }

  getInstructorfromPayload()
  {
    return this.getInstructorPayload().instructorid;
  }
  postintructorid(instructorid: Number)
  {
    return this.http.post(this.url + 'getinstructorid', instructorid);
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
    return this.http.put(this.url + 'instructorcourse' + `/${instructor.instructorid}`, instructor);
  }
  getInstructorCourse()
  {
    return this.http.get(this.url + 'instructorcourse');
  }
 
}

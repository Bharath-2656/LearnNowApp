import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUsers!: User;
  users!: User[];
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  readonly baseURL = 'http://localhost:9000/admin/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUserProfile() {
    return this.http.get(this.baseURL + 'users');
  }

  postUser(user: User) {
    return this.http.post(this.baseURL + 'users', user,this.noAuthHeader);
  }

  putUser(user: User) {
    return this.http.put(this.baseURL + 'users' + `/${user.userid}`, user);
  }

  deleteUser(userid: string) {
    return this.http.delete(this.baseURL + 'users' + `/${userid}`);
  }

  login(authCredentials:any) {
    return this.http.post(this.baseURL + '/authenticate', authCredentials,this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  postRefreshtokencheck(user: User)
  {   
    return this.http.post(this.baseURL + 'token', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
     var userid;
     setTimeout(() => {
      userid = Number(this.cookieService.get('userid'));
    }, 500);
    localStorage.removeItem('token');
      
    return this.http.post(this.baseURL + 'deletetoken'+ `/${userid}`, userid);
  }
 getuserfromPayload()
 {
   return this.getUserPayload().userid;
 }
 getRole(){
      return this.getUserPayload().role;
 }
  getUserPayload() {
    var token = this.getToken();
     
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();  
    if (userPayload)
   {
     return userPayload.exp > Date.now() / 1000;
   }
    else
      return false;
  }

  postUserCourse(courseid: String, userid: Number){
 
    
    return this.http.put(this.baseURL + 'usercourse' + `/${userid}` + `/${courseid}`,courseid);
  }
  postAreaOfIntrestForUser(userid: Number, areaofintrest: String)
  {   
    return this.http.put(this.baseURL + 'usercoursearea' + `/${userid}`+`/${areaofintrest}`, areaofintrest)
  }
  getUsercourse()
  {
    return this.http.get(this.baseURL + 'usercourse');
  }

  payment(stripeToken: any, price: Number): Observable<any>
  {   
    return this.http.post<any>(this.baseURL + 'payment' +`/${price}` ,{token:stripeToken});
  }
  sendConfirmationMail(user: User)
  {  
    return this.http.post('http://localhost:9000/admin/user_mail', user);
  }
  
}

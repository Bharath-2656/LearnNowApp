import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

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
    console.log(user);
    
    return this.http.post(this.baseURL + 'token', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
 getuserfromPayload()
 {
   const userid = this.getUserPayload().userid;
   return userid;
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
    console.log("jump");  
    if (userPayload)
   {
     console.log(userPayload.exp > Date.now() / 1000);
     
      return userPayload.exp > Date.now() / 1000;
   }
    else
      return false;
  }

  postUserCourse(user: User){
    console.log(user);
    
    return this.http.put(this.baseURL + 'usercourse' + `/${user.userid}`,user);
  }

  sendConfirmationMail(user: User)
  {
    console.log("presidio");
    
    return this.http.post('http://localhost:9000/admin/user_mail', user);
  }


}

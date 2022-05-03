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

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
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
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

}
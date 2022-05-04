import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  readonly baseURL = 'http://localhost:9000/instructor/';

  constructor(private http: HttpClient) { }

  getInstructorProfile() {
    return this.http.get(this.baseURL + 'instructors');
  }

}

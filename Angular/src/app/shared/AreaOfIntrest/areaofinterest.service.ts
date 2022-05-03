import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaOfInterest } from './AreaOfInterest.model';

@Injectable({
  providedIn: 'root'
})
export class AreaofinterestService {

  areaOfInterest!: AreaOfInterest[];
  readonly baseURL = 'http://localhost:9000/admin/';

  constructor(private http: HttpClient) { }

  getAreaOfInterest() {
    return this.http.get(this.baseURL + 'areaofinterest' )
  }

}

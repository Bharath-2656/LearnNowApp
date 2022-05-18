import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaOfInterest } from './AreaOfInterest.model';
import { globalVars } from "../Url/url.model";

@Injectable({
  providedIn: 'root'
})
export class AreaofinterestService {

  areaOfInterest!: AreaOfInterest[];
  readonly baseURL = 'http://localhost:9000/admin/';
  url: string = `${globalVars.backendAPI}/admin/`;

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getAreaOfInterest() {
    return this.http.get(this.url + 'areaofinterest' )
  }

}

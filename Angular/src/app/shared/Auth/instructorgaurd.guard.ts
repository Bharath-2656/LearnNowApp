import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InstructorService } from '../services/Instructor/instructor.service';
import {Location} from '@angular/common';
import { UserService } from '../services/User/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InstructorgaurdGuard implements CanActivate {
  constructor(private instructorService: InstructorService, private router:Router, private toastr: ToastrService, private location: Location, private userService: UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (!this.instructorService.isLoggedIn()) {
        const instructorid = this.instructorService.getInstructorfromPayload();
        this.instructorService.postRefreshtokencheck(instructorid).subscribe((res : any)=>{
        {
          this.instructorService.setToken(res['token']);
          this.location.back();

        }
        (err:any)=>{
        }
        });
       
        // this.toastr.error('Not Authorized','Error');
      }      
    return this.userService.getRole().includes(route.data['role']);
    //return true;
  }
  
}

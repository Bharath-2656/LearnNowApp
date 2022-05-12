import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/User/user.service';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor( private userService:UserService, private router:Router, private location: Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn()) {
        const userid = this.userService.getuserfromPayload();
        this.userService.postRefreshtokencheck(userid).subscribe((res : any)=>{
        {
          this.userService.setToken(res['token']);
          this.location.back();

        }
        (err:any)=>{
        }
        });
        this.router.navigateByUrl('/user/login');
        this.userService.deleteToken(userid);
        return false;
      }
    return this.userService.getRole().includes(route.data['role']);;
  }
  
}

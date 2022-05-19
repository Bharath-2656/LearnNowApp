import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/User/user.service';
import {Location} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor( private userService:UserService, private router:Router, private location: Location, private cookieService: CookieService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if (!this.userService.isLoggedIn()) {
       
       const userid = Number(this.cookieService.get('userid'));
        this.userService.postRefreshtokencheck(userid).subscribe((res : any)=>{
        {
          this.userService.setToken(res['token']);
          this.location.back();

        }
        (err:any)=>{
        }
        });
        // setTimeout(() => {
        //   this.router.navigateByUrl('/user/login');
        // }, 2000);
        console.log("Not allowed");
        
        this.userService.deleteToken();
        return false;
      }
    return this.userService.getRole().includes(route.data['role']);;
  }
  
}

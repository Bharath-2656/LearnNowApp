import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})


export class InstructorProfileComponent implements OnInit {

  public id!: any;
  instructors: any[] = [];

  constructor(private instructorService: InstructorService, private userService: UserService,private cookieService: CookieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id=this.route.snapshot.paramMap.get('id');
   
    this.instructorService.getInstructorCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.instructors[index]=res[index];       
      }
    },
    (err:any) => {
      console.log(err);
      });

  };
  onLogout(){
    this.userService.deleteToken().subscribe((res:any) => { 
    });
    this.cookieService.delete('refreshtoken');  
    this.cookieService.deleteAll('/');
    this.router.navigate(['user/login']);
  }

}
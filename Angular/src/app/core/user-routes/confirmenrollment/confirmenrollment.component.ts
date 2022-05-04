import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/shared/User/user.service';

@Component({
  selector: 'app-confirmenrollment',
  templateUrl: './confirmenrollment.component.html',
  styleUrls: ['./confirmenrollment.component.css']
})
export class ConfirmenrollmentComponent implements OnInit {
  public id!: any;
  userid!: any;
  courses: any[] = [];
  userDetails: any[] = [];
  constructor( private userService: UserService, private router: Router, ) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((res:any) => {
        this.userDetails=res;
        console.log(this.userDetails);
        this.userid=this.userService.getUserPayload().userid;      
        
    },
    (err:any) => {
      console.log(err);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/shared/services/Instructor/instructor.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})


export class InstructorProfileComponent implements OnInit {

  public id!: any;
  instructors: any[] = [];

  constructor(private instructorService: InstructorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    
    this.instructorService.getInstructor().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.instructors[index]=res[index];       
      }
    },
    (err:any) => {
      console.log(err);
      });

  };


}
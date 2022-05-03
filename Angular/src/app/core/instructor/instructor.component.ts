import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/shared/Instructor/instructor.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  public id!: any;
  instructors: any[] = [];
  
  constructor(private instructorService: InstructorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id=this.route.snapshot.paramMap.get('id');
    
    this.instructorService.getInstructorProfile().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.instructors[index]=res[index];
       
      }
    },
    (err:any) => {
      console.log(err);
      });

  };

}
